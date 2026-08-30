import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for managing WebSocket connection for real-time slot telemetry.
 * Connects to ws://localhost:8080/ws/slots or fallback broadcast channel.
 */
export function useWebSocket(onMessageCallback) {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const broadcastChannelRef = useRef(null);

  useEffect(() => {
    // 1. Setup Local BroadcastChannel as fallback for cross-tab live sync
    if ('BroadcastChannel' in window) {
      const bc = new BroadcastChannel('parkease_realtime_slots');
      broadcastChannelRef.current = bc;
      bc.onmessage = (event) => {
        if (onMessageCallback && event.data) {
          onMessageCallback(event.data);
        }
      };
    }

    // 2. Setup WebSocket connection
    const wsUrl = import.meta.env?.VITE_WEBSOCKET_URL || 'ws://localhost:8080/ws/slots';
    let socket = null;

    try {
      socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        setIsConnected(true);
        console.log('[ParkEase Realtime] WebSocket Connected to:', wsUrl);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (onMessageCallback) {
            onMessageCallback(data);
          }
        } catch (e) {
          console.warn('[ParkEase Realtime] Message parse error:', e);
        }
      };

      socket.onerror = (err) => {
        console.warn('[ParkEase Realtime] WS Error, operating with local broadcast fallback:', err.message || err);
        setIsConnected(false);
      };

      socket.onclose = () => {
        setIsConnected(false);
      };
    } catch (err) {
      console.warn('[ParkEase Realtime] WS Connection Failed, using broadcast fallback:', err);
    }

    return () => {
      if (socket) {
        socket.close();
      }
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
      }
    };
  }, [onMessageCallback]);

  // Method to manually send or broadcast slot changes across tabs
  const broadcastSlotChange = useCallback((slotPayload) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(slotPayload));
    }
    if (broadcastChannelRef.current) {
      broadcastChannelRef.current.postMessage(slotPayload);
    }
  }, []);

  return { isConnected, broadcastSlotChange };
}

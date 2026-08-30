package com.parkease.api.config;

import com.parkease.api.websocket.SlotStatusWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private SlotStatusWebSocketHandler slotStatusWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(@NonNull WebSocketHandlerRegistry registry) {
        if (slotStatusWebSocketHandler != null) {
            registry.addHandler(slotStatusWebSocketHandler, "/ws/slots")
                    .setAllowedOrigins("*");
        }
    }
}

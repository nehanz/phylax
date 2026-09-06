package com.phylax.core.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Health check endpoints for Core Service.
 * Used to verify service is up and running.
 */
@RestController
@RequestMapping("/api/health")
public class HealthController {
    
    /**
     * Basic health check.
     * Returns service status and current time.
     */
    @GetMapping
    public Map<String, Object> health() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("service", "core-service");
        response.put("status", "UP");
        response.put("version", "0.1.0");
        response.put("timestamp", LocalDateTime.now().toString());
        return response;
    }
    
    /**
     * Deep health check.
     * Will include database/redis status later.
     */
    @GetMapping("/details")
    public Map<String, Object> detailedHealth() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("service", "core-service");
        response.put("status", "UP");
        response.put("version", "0.1.0");
        response.put("javaVersion", System.getProperty("java.version"));
        response.put("availableProcessors", Runtime.getRuntime().availableProcessors());
        response.put("freeMemory", Runtime.getRuntime().freeMemory());
        response.put("totalMemory", Runtime.getRuntime().totalMemory());
        return response;
    }
}
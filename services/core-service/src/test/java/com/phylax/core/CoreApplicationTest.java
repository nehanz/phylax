package com.phylax.core;

import com.phylax.core.controller.HealthController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests that the Core Service starts and health check works.
 */
@SpringBootTest
class CoreApplicationTest {
    
    @Autowired
    private HealthController healthController;
    
    @Test
    void contextLoads() {
        // Verifies Spring context starts without errors
    }
    
    @Test
    void healthCheckReturnsUp() {
        Map<String, Object> health = healthController.health();
        
        assertEquals("core-service", health.get("service"));
        assertEquals("UP", health.get("status"));
        assertEquals("0.1.0", health.get("version"));
        assertNotNull(health.get("timestamp"));
    }
    
    @Test
    void detailedHealthHasSystemInfo() {
        Map<String, Object> details = healthController.detailedHealth();
        
        assertNotNull(details.get("javaVersion"));
        assertNotNull(details.get("availableProcessors"));
        assertNotNull(details.get("freeMemory"));
    }
}
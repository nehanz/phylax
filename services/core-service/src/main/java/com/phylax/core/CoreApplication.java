package com.phylax.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for Phylax Core Service.
 * Handles user auth, project management, and API key operations.
 */
@SpringBootApplication
public class CoreApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(CoreApplication.class, args);
    }
}
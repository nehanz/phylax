# System Architecture

## Overview
Phylax is an open-source API behavior intelligence and anomaly detection platform. It captures, ingests, analyzes, and correlates API traffic to detect security threats, contract drift, and performance regressions.

---

## High-Level Architecture

```
                  ┌────────────────────────┐
                  │    API Consumers /     │
                  │   Client Applications  │
                  └───────────┬────────────┘
                              │
                    HTTP/REST │ (Ingestion Traffic)
                              ▼
                  ┌────────────────────────┐
                  │   Ingestion Service    │
                  │      (Port 8082)       │
                  └───────────┬────────────┘
                              │
                              ▼ (JSON Telemetry Events)
                  ┌────────────────────────┐
                  │  Apache Kafka Cluster  │
                  │   Topic: api-telemetry │
                  └───────┬────────┬───────┘
                          │        │
           ┌──────────────┘        └──────────────┐
           ▼                                      ▼
┌───────────────────────┐              ┌───────────────────────┐
│    Behavior Engine    │              │   Analytics Service   │
│      (Port 8085)      │              │      (Port 8083)      │
└──────────┬────────────┘              └──────────┬────────────┘
           │                                      │
           ▼                                      ▼
┌───────────────────────┐              ┌───────────────────────┐
│ PostgreSQL & Redis    │              │ ClickHouse Time-Series│
│ (Metadata / Cache)    │              │ (Telemetry Analytics) │
└───────────────────────┘              └──────────┬────────────┘
                                                  │
                                                  ▼
                                       ┌───────────────────────┐
                                       │   Phylax Dashboard    │
                                       │      (Port 3000)      │
                                       └───────────────────────┘
```

---

## Microservices

### 1. API Gateway (`8080`)
* **Technology**: Spring Cloud Gateway
* **Role**: Primary edge router and security perimeter. Validates JWTs, terminates TLS, applies rate limits, and routes inbound requests to internal microservices.

### 2. Core Service (`8081`)
* **Technology**: Spring Boot, Spring Data JPA, PostgreSQL
* **Role**: Manages user accounts, projects, tenant policies, and API key lifecycles.

### 3. Ingestion Service (`8082`)
* **Technology**: Spring Boot, Apache Kafka Producer
* **Role**: High-throughput receiver for incoming API telemetry. Performs non-blocking validation, strips sensitive PII, and streams events directly to Kafka.

### 4. Behavior Engine (`8085`)
* **Technology**: Spring Boot, Apache Kafka Consumer, ClickHouse
* **Role**: Real-time event stream processor. Evaluates API request patterns against baseline "API DNA", flags anomalous payloads or bursts, and emits security alerts.

### 5. Analytics Service (`8083`)
* **Technology**: Spring Boot, ClickHouse JDBC, Redis
* **Role**: Aggregates time-series metrics from ClickHouse, computes percentile latencies, throughput, and error rates for dashboard queries.

### 6. Dashboard (`3000`)
* **Technology**: React 18, TypeScript, Tailwind CSS, TanStack Query
* **Role**: Real-time web UI visualizing cluster health, event pipelines, and behavioral alerts.

---

## Infrastructure Components

* **Apache Kafka (`9092`)**: Distributed, fault-tolerant message broker handling streaming ingestion buffers.
* **ClickHouse (`8123`, `9009`)**: High-performance columnar database optimized for billions of API telemetry records.
* **PostgreSQL (`5432`)**: ACID-compliant storage for users, projects, and rules (local Docker or Supabase Cloud).
* **Redis (`6379`)**: In-memory store for rate limiting tokens and cached session state.

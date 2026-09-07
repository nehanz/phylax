# Phylax

> Open-Source API Behavior Intelligence & Anomaly Detection Platform

Phylax is a distributed microservices platform designed to monitor API traffic in real time, establish behavioral baselines ("API DNA"), detect anomalous usage patterns, and provide deep operational analytics without adding latency to production services.

---

## Architecture & Data Flow

Phylax separates high-throughput traffic ingestion from real-time behavioral analysis using an asynchronous event-driven architecture.

```
                  ┌────────────────────────┐
                  │   Client / SDK Traffic │
                  └───────────┬────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │  Ingestion Service     │ (Port 8082)
                  └───────────┬────────────┘
                              │
                              ▼  (asynchronous events)
                  ┌────────────────────────┐
                  │  Apache Kafka Cluster  │ (Port 9092)
                  └───────────┬────────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
   ┌───────────────────────┐     ┌───────────────────────┐
   │    Behavior Engine    │     │   Analytics Service   │
   │   (Anomaly Detection) │     │  (Metrics Aggregation)│
   │      (Port 8085)      │     │      (Port 8083)      │
   └───────────┬───────────┘     └───────────┬───────────┘
               │                             │
               ▼                             ▼
   ┌───────────────────────┐     ┌───────────────────────┐
   │ PostgreSQL (Metadata) │     │ ClickHouse (Telemetry)│
   │  & Redis (Fast Cache) │     │ (Ports 8123 / 9009)   │
   └───────────────────────┘     └───────────┬───────────┘
                                             │
                                             ▼
                                 ┌───────────────────────┐
                                 │   Phylax Dashboard    │ (Port 3000)
                                 │      (React + Vite)   │
                                 └───────────────────────┘
```

### Microservice Registry

| Service | Port | Technology | Core Responsibility |
|---|---|---|---|
| **API Gateway** | `8080` | Spring Cloud Gateway | Central ingress, routing, JWT auth validation |
| **Core Service** | `8081` | Spring Boot, JPA | User accounts, project management, API key lifecycle |
| **Ingestion Service** | `8082` | Spring Boot, Kafka | High-throughput telemetry receiver and Kafka stream publisher |
| **Analytics Service** | `8083` | Spring Boot, ClickHouse, Redis | Time-series telemetry metrics, aggregations, query APIs |
| **Behavior Engine** | `8085` | Spring Boot, Kafka, ClickHouse | Real-time stream analysis, behavioral baselining, anomaly alerts |
| **Dashboard** | `3000` | React 18, TypeScript, Tailwind | Real-time monitoring UI, telemetry visualization |

---

## Infrastructure

* **Apache Kafka**: High-throughput distributed event streaming.
* **ClickHouse**: Columnar time-series database for telemetry analytics.
* **PostgreSQL**: Relational metadata storage (Supports local Docker or Supabase Cloud).
* **Redis**: Low-latency cache and token blacklisting.

---

## Quick Start

### 1. Prerequisites
* Docker Engine 24+ & Docker Compose v2
* Java 21 & Maven 3.9+ (if running backend locally)
* Node.js 18+ (if running frontend locally)

### 2. Configure Environment
```bash
cp .env.example .env
```
Choose your PostgreSQL setup in `.env`:
* **Docker Postgres**: Keep `COMPOSE_PROFILES=postgres`.
* **Supabase / External**: Set `COMPOSE_PROFILES=` (empty) and provide your `DATABASE_URL`.

### 3. Choose Development Workflow

#### Option A: Half Docker (Recommended for Backend Dev)
Start infrastructure in containers, and run only the service you are developing:
```bash
# Start Kafka, Redis, ClickHouse, Postgres
./dev.sh infra

# Run a specific service locally
./dev.sh run core-service
```

#### Option B: Full Stack (Everything in Docker)
```bash
./dev.sh full
```

#### Option C: Frontend Dashboard
```bash
./dev.sh ui
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Documentation

* [Getting Started Guide](docs/getting-started.md)
* [System Architecture](docs/architecture.md)
* [Project Roadmap](docs/roadmap.md)
* **Service Scopes & Specifications**:
  * [API Gateway](docs/services/api-gateway.md)
  * [Core Service](docs/services/core-service.md)
  * [Ingestion Service](docs/services/ingestion-service.md)
  * [Behavior Engine](docs/services/behavior-engine.md)
  * [Analytics Service](docs/services/analytics-service.md)

---

## Contributing

We welcome contributions! Please review our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

---

## License

Phylax is licensed under the [Apache License, Version 2.0](LICENSE).

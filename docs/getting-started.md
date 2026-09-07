# Getting Started with Phylax

This guide walks you through setting up and running the Phylax platform locally.

---

## 1. Prerequisites

Ensure the following tools are installed on your workstation:
* **Docker & Docker Compose**: Docker Engine 24+ or Docker Desktop
* **Java**: OpenJDK 21
* **Maven**: 3.9+
* **Node.js**: Node 18 or 20+ (for Frontend Dashboard)

---

## 2. Clone & Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/phylax/phylax.git
   cd phylax
   ```

2. Copy the environment configuration:
   ```bash
   cp .env.example .env
   ```

3. Choose your database setup in `.env`:
   * **Local Docker Postgres**: Keep `COMPOSE_PROFILES=postgres`.
   * **Supabase Cloud / External**: Set `COMPOSE_PROFILES=` (empty) and provide your Supabase connection string under `DATABASE_URL`.

---

## 3. Development Workflows

Phylax supports two primary developer workflows:

### Workflow 1: Half Docker (Recommended for Backend Dev)
Start infrastructure (Kafka, Redis, ClickHouse, PostgreSQL) in Docker, and run only the service you are actively modifying in your IDE or terminal.

```bash
# 1. Start all infrastructure services
./dev.sh infra

# 2. Run the service you are developing (e.g., core-service)
./dev.sh run core-service

# 3. Check health status across ports
./dev.sh health
```

### Workflow 2: Full Docker (Full Stack)
Build and spin up all microservices and infrastructure together inside containers:

```bash
# Build images and start all containers in detached mode
./dev.sh full

# View container logs
docker compose -f docker/docker-compose.yml logs -f

# Stop all containers when finished
./dev.sh full:down
```

---

## 4. Running the Frontend Dashboard

The frontend dashboard provides a real-time cluster health overview and telemetry explorer:

```bash
./dev.sh ui
```

Open your browser to: **[http://localhost:3000](http://localhost:3000)**

---

## 5. Port Reference

| Service | Port | Endpoint |
|---|---|---|
| API Gateway | `8080` | `http://localhost:8080/api/health` |
| Core Service | `8081` | `http://localhost:8081/api/health` |
| Ingestion Service | `8082` | `http://localhost:8082/api/health` |
| Analytics Service | `8083` | `http://localhost:8083/api/health` |
| Behavior Engine | `8085` | `http://localhost:8085/api/health` |
| PostgreSQL | `5432` | `localhost:5432` |
| Apache Kafka | `9092` | `localhost:9092` |
| Redis | `6379` | `localhost:6379` |
| ClickHouse HTTP | `8123` | `http://localhost:8123/ping` |
| ClickHouse Native TCP | `9009` | `localhost:9009` |
| Dashboard UI | `3000` | `http://localhost:3000` |

---

## 6. Troubleshooting

* **Docker Daemon Not Running**:
  Ensure Docker Desktop or the dockerd daemon is active before running `./dev.sh infra` or `./dev.sh full`.
* **Port Conflicts**:
  If a port is already bound on your machine, override the corresponding port in your `.env` file (e.g. `API_GATEWAY_PORT=8090`).

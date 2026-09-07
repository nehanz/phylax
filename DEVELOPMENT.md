# Development Workflow Guide

## Quick CLI Helper (Linux & Windows)
Fast shortcuts for common tasks:

| Action | Linux / macOS | Windows |
|---|---|---|
| Start Infrastructure (Option 1) | `./dev.sh infra` | `dev.bat infra` |
| Stop Infrastructure | `./dev.sh infra:down` | `dev.bat infra:down` |
| Start Full Stack (Option 2) | `./dev.sh full` | `dev.bat full` |
| Stop Full Stack | `./dev.sh full:down` | `dev.bat full:down` |
| Run Single Service | `./dev.sh run <service-name>` | `dev.bat run <service-name>` |
| Check Health Endpoints | `./dev.sh health` | `dev.bat health` |
| Build All JARs | `./dev.sh build` | `dev.bat build` |

---

## Setup Prerequisites
1. Copy `.env.example` to `.env` (automatically done if using `./dev.sh` or `dev.bat`):
   ```bash
   cp .env.example .env
   ```
2. Choose your PostgreSQL database option in `.env`:
   - **Local Docker Postgres**: Keep `COMPOSE_PROFILES=postgres`.
   - **Supabase / External Postgres**: Set `COMPOSE_PROFILES=` (empty) and provide your Supabase `DATABASE_URL`.

---

## Option 1: Half Docker (Recommended for Backend Dev)
Run infrastructure in Docker, and run only the service you are developing locally.

### 1. Start Infrastructure
```bash
./dev.sh infra
# or manually: docker compose -f docker/docker-compose.infrastructure.yml up -d
```

### 2. Run Services Locally
Run only the services you need:
```bash
./dev.sh run core-service
# or manually: cd services/core-service && mvn spring-boot:run
```

Available service names:
- `api-gateway` (port 8080)
- `core-service` (port 8081)
- `ingestion-service` (port 8082)
- `analytics-service` (port 8083)
- `behavior-engine` (port 8085)

### 3. Verify Health
```bash
./dev.sh health
```

---

## Option 2: Full Docker (Full Stack)
Run the entire stack in containers with one command.

```bash
./dev.sh full
# or manually: docker compose -f docker/docker-compose.yml up --build -d
```
To stop:
```bash
./dev.sh full:down
```

---

## Service Ports

| Service | Port | Local URL |
|---------|------|-----------|
| API Gateway | 8080 | http://localhost:8080 |
| Core Service | 8081 | http://localhost:8081 |
| Ingestion Service | 8082 | http://localhost:8082 |
| Analytics Service | 8083 | http://localhost:8083 |
| Behavior Engine | 8085 | http://localhost:8085 |
| PostgreSQL | 5432 | localhost:5432 |
| Kafka (Host) | 9092 | localhost:9092 |
| Redis | 6379 | localhost:6379 |
| ClickHouse (HTTP) | 8123 | localhost:8123 |
| ClickHouse (Native TCP) | 9009 | localhost:9009 |
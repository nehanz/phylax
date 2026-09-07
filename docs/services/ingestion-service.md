# Ingestion Service — Scope & Responsibilities

## Purpose
> Acts as the high-throughput intake layer that receives, validates, and streams raw API telemetry into Apache Kafka without introducing latency.

---

## Responsibilities
- Accept high-frequency batch and single API telemetry events from client SDKs.
- Validate payload structure against the Phylax Telemetry Schema.
- Sanitize headers and query parameters (redact passwords, authorization tokens, credit cards).
- Publish validated events to the Kafka `api-telemetry` topic asynchronously.

---

## External Dependencies
* **Apache Kafka (Port 9092)**: Publishes telemetry payloads to topic `api-telemetry`.
* **Redis (Port 6379)**: In-memory cache for fast API key validation without hitting the database.

---

## API / Event Contracts

### REST Endpoints
* `POST /api/v1/ingest`: Ingest a single API telemetry event.
  ```json
  {
    "projectId": "proj_123",
    "endpoint": "/v1/users",
    "method": "GET",
    "statusCode": 200,
    "durationMs": 42,
    "timestamp": "2026-09-07T22:00:00Z",
    "clientIp": "192.168.1.1",
    "requestHeaders": {},
    "responseHeaders": {}
  }
  ```
* `POST /api/v1/ingest/batch`: Ingest up to 500 events in a single batch.
* `GET /api/health`: Health status endpoint.

### Kafka Events Produced
* **Topic**: `api-telemetry`
* **Key**: `projectId` (ensures partition ordering per project)
* **Value**: Serialized JSON telemetry payload

---

## Acceptance Criteria
- [ ] Service starts on port `8082` and health check returns `status: "UP"`.
- [ ] Valid telemetry payloads return HTTP `202 Accepted` within `< 10ms`.
- [ ] Events are successfully published to Kafka topic `api-telemetry`.
- [ ] Malformed payloads are rejected with HTTP `400 Bad Request` before reaching Kafka.

---

## Out of Scope (for now)
- gRPC ingestion endpoint (REST JSON initially).
- Deep full-body payload hashing.

---

## Future Enhancements
- Protocol Buffers (Protobuf) serialization over Kafka.
- Native gRPC and OpenTelemetry receiver endpoints.

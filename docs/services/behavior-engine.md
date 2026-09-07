# Behavior Engine — Scope & Responsibilities

## Purpose
> Consumes the streaming API event log from Kafka to construct behavioral baselines ("API DNA") and flag real-time security and operational anomalies.

---

## Responsibilities
- Consume events continuously from Kafka topic `api-telemetry`.
- Maintain statistical moving baselines for endpoint response latencies, payload sizes, and status codes.
- Detect behavioral violations:
  - Error rate spikes (e.g. sudden surge in 4xx / 5xx responses).
  - P99 latency deviations exceeding established baseline standard deviation.
  - Unusual traffic bursts or endpoint brute-forcing from single IP blocks.
- Persist detected incident records and telemetry events to ClickHouse for historical analysis.
- Emit anomaly notifications to Kafka topic `api-anomalies`.

---

## External Dependencies
* **Apache Kafka (Port 9092)**:
  - Consumes: `api-telemetry` (consumer group: `behavior-engine-group`)
  - Produces: `api-anomalies`
* **ClickHouse (Port 8123 / 9009)**: Stores long-term telemetry metrics and detected anomaly records.
* **PostgreSQL (Port 5432)**: Reads alerting rules and sensitivity thresholds.

---

## API / Event Contracts

### REST Endpoints
* `GET /api/health`: Health status endpoint.
* `GET /api/v1/rules`: List active anomaly detection rules for a project.

### Kafka Events Consumed
* **Topic**: `api-telemetry`

### Kafka Events Produced
* **Topic**: `api-anomalies`
* **Payload**:
  ```json
  {
    "anomalyId": "anom_987",
    "projectId": "proj_123",
    "endpoint": "/v1/users",
    "type": "LATENCY_SPIKE",
    "severity": "HIGH",
    "baselineValue": 45.2,
    "observedValue": 350.0,
    "timestamp": "2026-09-07T22:05:00Z"
  }
  ```

---

## Acceptance Criteria
- [ ] Service starts on port `8085` and health check returns `status: "UP"`.
- [ ] Connects successfully to Kafka broker on startup without crashing.
- [ ] Events from `api-telemetry` are acknowledged and written to ClickHouse.
- [ ] Simulated error burst triggers an anomaly record in `api-anomalies`.

---

## Out of Scope (for now)
- Deep neural network / ML model training (statistical z-score and moving average baselines initially).
- Automatic inline traffic blocking.

---

## Future Enhancements
- Machine learning models for payload structure drift detection.
- Webhook notification delivery (Slack, PagerDuty, Opsgenie).

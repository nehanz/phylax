# Analytics Service — Scope & Responsibilities

## Purpose
> Queries and aggregates high-volume time-series telemetry from ClickHouse to serve metrics, historical trends, and latency percentiles to the Phylax Dashboard.

---

## Responsibilities
- Execute high-performance analytical queries against ClickHouse columnar tables.
- Compute rolling aggregations:
  - Throughput (Requests Per Second / Minute).
  - Latency distributions (P50, P90, P99).
  - Status code breakdown (2xx, 4xx, 5xx ratios).
- Cache expensive query results in Redis with short TTLs (10–30 seconds).
- Expose structured REST endpoints tailored for frontend dashboard visualization.

---

## External Dependencies
* **ClickHouse (Port 8123 / 9009)**: Primary data store for historical telemetry events.
* **Redis (Port 6379)**: In-memory cache for aggregate dashboard queries.
* **API Gateway (Port 8080)**: Routes external frontend analytics queries to this service.

---

## API / Event Contracts

### REST Endpoints
* `GET /api/v1/analytics/overview?projectId={id}&timeRange={range}`:
  * Returns total request count, error rate percentage, and average latency over the selected window.
* `GET /api/v1/analytics/latency?projectId={id}`:
  * Returns P50, P90, and P99 latency percentiles broken down by time buckets.
* `GET /api/v1/analytics/endpoints?projectId={id}`:
  * Lists top endpoints ranked by traffic volume or error rates.
* `GET /api/health`: Health status endpoint.

---

## Acceptance Criteria
- [ ] Service starts on port `8083` and health check returns `status: "UP"`.
- [ ] Connects to ClickHouse via JDBC and executes ping query successfully.
- [ ] Overview queries return within `< 50ms` when cached in Redis.
- [ ] Aggregation queries handle empty dataset gracefully without throwing 500 errors.

---

## Out of Scope (for now)
- Ad-hoc custom SQL query builder interface.
- Raw CSV export for millions of log rows.

---

## Future Enhancements
- ClickHouse materialized views for zero-latency pre-aggregated metrics.
- Exportable PDF / executive summary reports.

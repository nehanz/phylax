# API Gateway — Scope & Responsibilities

## Purpose
> Serves as the single secure entry point into the Phylax cluster, routing external traffic to the appropriate microservices while enforcing authentication and rate limits.

---

## Responsibilities
- Reverse-proxy client traffic to internal microservices based on URI path.
- Validate incoming JWT tokens and inject authenticated tenant headers (`X-Tenant-ID`, `X-User-ID`).
- Apply IP and API-key-based rate limiting using Redis.
- Expose global health check endpoint (`/api/health`).

---

## External Dependencies
* **Redis**: Rate limiting token buckets and revoked token blacklist.
* **Core Service (`http://core-service:8081`)**: Auth validation and project routing lookup.
* **Ingestion Service (`http://ingestion-service:8082`)**: Telemetry ingestion routes.
* **Analytics Service (`http://analytics-service:8083`)**: Analytics query routes.

---

## API / Event Contracts

### Routing Contracts
| Inbound Path | Destination | Notes |
|---|---|---|
| `/api/auth/**` | `http://core-service:8081` | Authentication endpoints |
| `/api/projects/**` | `http://core-service:8081` | Project management |
| `/api/v1/ingest/**` | `http://ingestion-service:8082` | Telemetry intake |
| `/api/v1/analytics/**` | `http://analytics-service:8083` | Telemetry queries |

### Health Check
* `GET /api/health`
  * Response: `{"service": "api-gateway", "status": "UP"}`

---

## Acceptance Criteria
- [ ] Gateway starts on port `8080` with Spring Cloud Gateway.
- [ ] Health endpoint returns HTTP `200` with `status: "UP"`.
- [ ] Requests to `/api/projects/**` are successfully forwarded to `core-service:8081`.
- [ ] Unauthenticated requests to protected endpoints return HTTP `401 Unauthorized`.

---

## Out of Scope (for now)
- Dynamic route discovery via Consul or Eureka (static routes in `application.yml` are sufficient).
- Webhook transformation pipelines.

---

## Future Enhancements
- Distributed tracing header injection (W3C Trace Context).
- Automated DDoS mitigation filters.

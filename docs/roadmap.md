# Project Roadmap

The vision for Phylax is to provide an accessible, high-performance API intelligence platform for modern engineering teams.

---

## Phase 1: Core Foundation & Pipeline (Current)
- [x] Multi-service Maven architecture with unified parent versioning.
- [x] Dual developer workflows (Half Docker for fast coding, Full Docker for complete verification).
- [x] Hybrid PostgreSQL support (Local Docker container or Supabase cloud).
- [x] Apache Kafka dual-listener streaming pipeline.
- [x] ClickHouse time-series data storage integration.
- [x] React 18 / TypeScript frontend dashboard with real-time health monitoring.

---

## Phase 2: Behavioral Baseline & DNA (Next)
- [ ] Implement statistical profiling for API endpoints (response size, latency, error distribution).
- [ ] Kafka consumer pipelines in `behavior-engine` for anomaly score calculations.
- [ ] Real-time incident triggers for abnormal traffic bursts or payload drift.
- [ ] API key generation, hash storage, and prefix validation in `core-service`.

---

## Phase 3: Analytics & Alerting
- [ ] Pre-computed hourly/daily ClickHouse rollup tables in `analytics-service`.
- [ ] Webhook dispatchers for Slack, PagerDuty, and Discord notifications.
- [ ] Dynamic filtering on the Frontend Dashboard (by project, endpoint, status code).
- [ ] Exportable OpenAPI specification drift reports.

---

## Phase 4: Enterprise Scale & SDKs
- [ ] Lightweight middleware SDKs for Node.js (Express/Fastify), Python (FastAPI), and Go.
- [ ] Role-Based Access Control (RBAC) and team workspaces.
- [ ] Single Sign-On (OIDC / OAuth2).

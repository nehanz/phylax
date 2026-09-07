# Core Service — Scope & Responsibilities

## Purpose
> Manages user accounts, projects, and API keys for the Phylax platform.

---

## Responsibilities
- User registration, authentication, password hashing, and JWT issuance.
- Project CRUD operations and tenant isolation boundaries.
- API key generation, hashing (BCrypt/SHA-256), verification, and revocation.
- Relational metadata persistence via Spring Data JPA.

---

## External Dependencies
* **PostgreSQL (Port 5432)**: Relational storage for users, projects, and hashed credentials.
* **Redis (Port 6379)**: Token blacklist and cached project lookups.
* **API Gateway (Port 8080)**: Proxies user requests to Core Service.

---

## API / Event Contracts

### REST Endpoints
* `POST /api/auth/register`: Register new user account.
* `POST /api/auth/login`: Authenticate and issue JWT.
* `GET /api/projects`: List projects owned by authenticated user.
* `POST /api/projects`: Create a new monitoring project.
* `POST /api/projects/{id}/keys`: Generate a new API key (plain key returned once; hash stored).
* `DELETE /api/keys/{keyId}`: Revoke an existing API key.
* `GET /api/health`: Health status endpoint.

### Events Produced
- None (synchronous REST API).

---

## Acceptance Criteria
- [ ] Service starts on port `8081` and health check returns `status: "UP"`.
- [ ] Users can register, log in, and receive a signed JWT.
- [ ] Project and API key records persist to PostgreSQL.
- [ ] Plain API keys are never persisted to the database in cleartext.

---

## Out of Scope (for now)
- Complex multi-tenancy beyond user project scoping.
- Stripe/billing usage tier limits.

---

## Future Enhancements
- Team role-based access control (Admin, Member, Viewer).
- Scoped API keys (Read-only vs Ingest-only).
- Audit log streams.

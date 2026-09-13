# Contributing to Phylax

Thank you for your interest in contributing to Phylax! This guide outlines the workflow and conventions for submitting issues and pull requests.

---

## Code of Conduct
All contributors are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Getting Started
1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/phylax.git
   cd phylax
   ```
3. Follow the [Getting Started Guide](docs/getting-started.md) to set up your environment.

---

## Branching Strategy
* `main`: Production-ready code. Protected branch.
* `feature/<feature-name>`: For new capabilities.
* `fix/<bug-name>`: For bug fixes.
* `docs/<topic>`: For documentation updates.

Always branch off the latest `main`.

---

## Commit Message Conventions
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short description>
```

### Common Types:
* `feat`: A new feature or capability.
* `fix`: A bug fix.
* `docs`: Documentation changes only.
* `refactor`: Code change that neither fixes a bug nor adds a feature.
* `test`: Adding or updating tests.
* `chore`: Build process, dependencies, or tooling updates.

### Examples:
* `feat(core): add api key revocation endpoint`
* `fix(gateway): resolve token validation header leak`
* `docs(readme): update service port mappings`

---

## Coding Standards

### Java / Spring Boot
* Follow standard Spring Boot idioms and clean architecture.
* Keep controllers thin; business logic belongs in service classes.
* Write unit tests for new service logic using JUnit 5 and Mockito.
* All services inherit Checkstyle rules from root `pom.xml`; fix `checkstyle.xml` violations before PR.

### TypeScript / Frontend
* Write strict, type-safe TypeScript (no `any` unless strictly justified).
* Use Tailwind CSS design tokens and reusable UI primitives.
* Verify your code builds with `npm run build` before pushing.

---

## Pull Request Process
1. Ensure automated checks pass before opening a PR:
   - Java quality / lint: `mvn checkstyle:check`
   - Java tests: `mvn test`
   - Build / verify: `mvn verify`
   - Frontend: `cd frontend/dashboard && npm run build`
2. Open a Pull Request against `main`.
3. Provide a clear description of changes and reference relevant issues (e.g., `Closes #42`).
4. Ensure PR review feedback is addressed promptly.

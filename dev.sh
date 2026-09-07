#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

if [ ! -f .env ] && [ -f .env.example ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

case "$1" in
  infra)
    docker compose -f docker/docker-compose.infrastructure.yml up -d
    ;;
  infra:down)
    docker compose -f docker/docker-compose.infrastructure.yml down
    ;;
  full)
    docker compose -f docker/docker-compose.yml up --build -d
    ;;
  full:down)
    docker compose -f docker/docker-compose.yml down
    ;;
  stop)
    docker compose -f docker/docker-compose.infrastructure.yml down 2>/dev/null || true
    docker compose -f docker/docker-compose.yml down 2>/dev/null || true
    ;;
  run)
    if [ -z "$2" ]; then
      echo "Usage: ./dev.sh run <service-name>"
      echo "Available services: api-gateway, core-service, ingestion-service, analytics-service, behavior-engine"
      exit 1
    fi
    if [ ! -d "services/$2" ]; then
      echo "Service 'services/$2' not found."
      exit 1
    fi
    echo "Starting $2..."
    (cd "services/$2" && mvn spring-boot:run)
    ;;
  build)
    mvn clean package -DskipTests
    ;;
  health)
    echo "Checking service health endpoints:"
    for port in 8080 8081 8082 8083 8085; do
      printf "Port %s: " "$port"
      curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:$port/api/health" 2>/dev/null || echo "UNREACHABLE"
    done
    ;;
  ui)
    echo "Starting Phylax Dashboard on port 3000..."
    (cd frontend/dashboard && npm run dev)
    ;;
  *)
    echo "Phylax Development Helper"
    echo ""
    echo "Usage: ./dev.sh <command>"
    echo ""
    echo "Commands:"
    echo "  infra        Start infrastructure in Docker"
    echo "  infra:down   Stop infrastructure containers"
    echo "  full         Start all services and infrastructure in Docker"
    echo "  full:down    Stop all containers"
    echo "  stop         Stop all running Phylax containers"
    echo "  run <name>   Run a specific service locally (e.g., ./dev.sh run core-service)"
    echo "  ui           Start the frontend dashboard (port 3000)"
    echo "  build        Build all microservices with Maven"
    echo "  health       Check health endpoints of running services"
    ;;
esac

export interface MicroserviceConfig {
  id: string;
  name: string;
  description: string;
  port: number;
  healthEndpoint: string;
  role: "gateway" | "core" | "ingestion" | "analytics" | "engine";
}

export const MICROSERVICES: MicroserviceConfig[] = [
  {
    id: "api-gateway",
    name: "API Gateway",
    description: "Central entrypoint routing traffic to microservices",
    port: 8080,
    healthEndpoint: "/api/health",
    role: "gateway",
  },
  {
    id: "core-service",
    name: "Core Service",
    description: "Tenant management, rule persistence, and configurations",
    port: 8081,
    healthEndpoint: "/api/health",
    role: "core",
  },
  {
    id: "ingestion-service",
    name: "Ingestion Service",
    description: "High-throughput API request receiver streaming to Kafka",
    port: 8082,
    healthEndpoint: "/api/health",
    role: "ingestion",
  },
  {
    id: "analytics-service",
    name: "Analytics Service",
    description: "Metrics, aggregations, and ClickHouse telemetry queries",
    port: 8083,
    healthEndpoint: "/api/health",
    role: "analytics",
  },
  {
    id: "behavior-engine",
    name: "Behavior Engine",
    description: "Real-time Kafka anomaly detection and policy evaluation",
    port: 8085,
    healthEndpoint: "/api/health",
    role: "engine",
  },
];

import axios from "axios";
import { MICROSERVICES } from "@/lib/constants";
import { ServiceHealthReport } from "../types";

export async function checkSingleServiceHealth(
  serviceId: string
): Promise<ServiceHealthReport> {
  const service = MICROSERVICES.find((s) => s.id === serviceId);
  if (!service) {
    throw new Error(`Unknown service: ${serviceId}`);
  }

  const startTime = performance.now();
  const report: ServiceHealthReport = {
    id: service.id,
    name: service.name,
    role: service.role,
    port: service.port,
    status: "PENDING",
    lastChecked: new Date(),
  };

  try {
    const url =
      service.id === "api-gateway"
        ? "/api/health"
        : `http://localhost:${service.port}/api/health`;

    const res = await axios.get(url, { timeout: 3000 });
    const latency = Math.round(performance.now() - startTime);

    report.status = res.data?.status === "UP" ? "UP" : "DOWN";
    report.latencyMs = latency;
    report.details = res.data;
  } catch (err: unknown) {
    report.status = "DOWN";
    report.latencyMs = Math.round(performance.now() - startTime);
    report.error = err instanceof Error ? err.message : "Connection failed";
  }

  return report;
}

export async function checkAllServicesHealth(): Promise<ServiceHealthReport[]> {
  const promises = MICROSERVICES.map((s) => checkSingleServiceHealth(s.id));
  return Promise.all(promises);
}

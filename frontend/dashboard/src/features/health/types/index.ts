export type HealthState = "UP" | "DOWN" | "PENDING";

export interface ServiceHealthReport {
  id: string;
  name: string;
  role: string;
  port: number;
  status: HealthState;
  latencyMs?: number;
  lastChecked: Date;
  details?: Record<string, unknown>;
  error?: string;
}

export interface ClusterSummary {
  total: number;
  healthy: number;
  failing: number;
  averageLatencyMs: number;
}

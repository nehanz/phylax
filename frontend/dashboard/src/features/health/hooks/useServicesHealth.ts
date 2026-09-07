import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/store/useAppStore";
import { checkAllServicesHealth } from "../services/healthService";
import { ClusterSummary, ServiceHealthReport } from "../types";

export function useServicesHealth() {
  const { autoRefresh } = useAppStore();

  const query = useQuery<ServiceHealthReport[]>({
    queryKey: ["services-health"],
    queryFn: checkAllServicesHealth,
    refetchInterval: autoRefresh ? 5000 : false,
    staleTime: 4000,
  });

  const reports = query.data || [];
  const healthyCount = reports.filter((r) => r.status === "UP").length;
  const failingCount = reports.filter((r) => r.status === "DOWN").length;

  const validLatencies = reports
    .filter((r) => r.latencyMs !== undefined && r.status === "UP")
    .map((r) => r.latencyMs as number);

  const averageLatencyMs =
    validLatencies.length > 0
      ? Math.round(
          validLatencies.reduce((a, b) => a + b, 0) / validLatencies.length
        )
      : 0;

  const summary: ClusterSummary = {
    total: reports.length,
    healthy: healthyCount,
    failing: failingCount,
    averageLatencyMs,
  };

  return {
    ...query,
    reports,
    summary,
  };
}

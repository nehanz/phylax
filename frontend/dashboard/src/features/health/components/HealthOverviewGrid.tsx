import { useServicesHealth } from "../hooks/useServicesHealth";
import { ServiceHealthCard } from "./ServiceHealthCard";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { CheckCircle2, AlertTriangle, Clock, Layers } from "lucide-react";

export function HealthOverviewGrid() {
  const { reports, summary, isLoading } = useServicesHealth();

  if (isLoading && reports.length === 0) {
    return <LoadingSpinner size="lg" label="Checking microservices health..." />;
  }

  const allHealthy = summary.healthy === summary.total && summary.total > 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/70 border-border/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Total Services
              </p>
              <p className="text-2xl font-bold mt-1">{summary.total}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
              <Layers className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/70 border-border/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Operational
              </p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">
                {summary.healthy}/{summary.total}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/70 border-border/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Offline / Issues
              </p>
              <p
                className={`text-2xl font-bold mt-1 ${
                  summary.failing > 0 ? "text-rose-400" : "text-muted-foreground"
                }`}
              >
                {summary.failing}
              </p>
            </div>
            <div
              className={`p-2.5 rounded-lg ${
                summary.failing > 0
                  ? "bg-rose-500/10 text-rose-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/70 border-border/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Avg Latency
              </p>
              <p className="text-2xl font-bold mt-1 font-mono">
                {summary.averageLatencyMs} ms
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Microservice Cluster
          </h3>
          <p className="text-xs text-muted-foreground">
            Live health telemetry polled every 5 seconds
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              allHealthy ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            }`}
          />
          <span className="text-xs font-medium text-muted-foreground">
            {allHealthy ? "All Systems Operational" : "Partial Outage / Starting"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <ServiceHealthCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}

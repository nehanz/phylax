import { HealthOverviewGrid } from "@/features/health/components/HealthOverviewGrid";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Database, HardDrive, Zap } from "lucide-react";

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-primary border-primary/30">
            Realtime Observer
          </Badge>
          <span className="text-xs text-muted-foreground">Cluster Mesh</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          System Overview & Behavior
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor microservice health, stream ingestion rates, and behavioral anomalies.
        </p>
      </div>

      <HealthOverviewGrid />

      <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>Phylax Event Pipeline Architecture</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-xs">
            <div className="p-3 rounded-lg border border-border/60 bg-background/60 text-center">
              <span className="font-semibold text-foreground">1. API Gateway</span>
              <p className="text-[11px] text-muted-foreground mt-0.5">Port 8080</p>
            </div>
            <div className="flex justify-center text-muted-foreground">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-lg border border-border/60 bg-background/60 text-center">
              <span className="font-semibold text-foreground">2. Ingestion Service</span>
              <p className="text-[11px] text-muted-foreground mt-0.5">Port 8082</p>
            </div>
            <div className="flex justify-center text-muted-foreground">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-lg border border-border/60 bg-background/60 text-center">
              <span className="font-semibold text-foreground">3. Kafka Broker</span>
              <p className="text-[11px] text-muted-foreground mt-0.5">Port 9092</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/40 text-xs">
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-background/40">
              <HardDrive className="w-4 h-4 text-amber-400" />
              <div>
                <p className="font-medium text-foreground">ClickHouse Analytics</p>
                <p className="text-[11px] text-muted-foreground">
                  High-speed columnar storage for telemetry logs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-background/40">
              <Database className="w-4 h-4 text-primary" />
              <div>
                <p className="font-medium text-foreground">PostgreSQL & Redis</p>
                <p className="text-[11px] text-muted-foreground">
                  Rule persistence and low-latency cache
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

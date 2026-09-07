import { ServiceHealthReport } from "../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Activity, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceHealthCardProps {
  report: ServiceHealthReport;
}

export function ServiceHealthCard({ report }: ServiceHealthCardProps) {
  const isUp = report.status === "UP";

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-200 hover:shadow-lg border-border/60 bg-card/80 backdrop-blur-sm",
        isUp ? "hover:border-emerald-500/40" : "hover:border-destructive/40"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "p-2 rounded-lg",
              isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-destructive/10 text-destructive"
            )}
          >
            <Server className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">
              {report.name}
            </CardTitle>
            <span className="text-xs text-muted-foreground font-mono">
              Port: {report.port}
            </span>
          </div>
        </div>

        <Badge
          variant={isUp ? "success" : "destructive"}
          className="gap-1.5 font-medium"
        >
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              isUp ? "bg-emerald-400 animate-pulse" : "bg-rose-500"
            )}
          />
          {report.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3 pt-1">
        <div className="flex items-center justify-between text-xs py-2 px-3 rounded-md bg-background/50 border border-border/40">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Activity className="w-3.5 h-3.5" />
            <span>Response Latency</span>
          </div>
          <span className="font-mono font-medium text-foreground">
            {isUp ? `${report.latencyMs} ms` : "Unreachable"}
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
          <span>Role: {report.role}</span>
          <a
            href={`http://localhost:${report.port}/api/health`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-0.5 hover:text-primary transition-colors"
          >
            Endpoint <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

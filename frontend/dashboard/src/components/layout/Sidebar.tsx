import { NavLink } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import {
  LayoutDashboard,
  Server,
  Activity,
  BarChart3,
  Cpu,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/services", label: "Microservices", icon: Server },
  { to: "/pipeline", label: "Pipeline & Ingestion", icon: Activity },
  { to: "/analytics", label: "Telemetry & Logs", icon: BarChart3 },
];

export function Sidebar() {
  const { sidebarOpen } = useAppStore();

  return (
    <aside
      className={cn(
        "fixed md:static inset-y-0 left-0 z-30 flex flex-col w-64 border-r border-border/40 bg-card/60 backdrop-blur-md transition-transform duration-200 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex flex-col flex-1 p-4 gap-1">
        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          System Overview
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm font-semibold"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <div className="mt-6 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Architecture
        </div>

        <div className="flex flex-col gap-2 p-3 rounded-lg border border-border/50 bg-background/50 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>5 Spring Boot Services</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kafka & ClickHouse</span>
          </div>
          <p className="text-[11px] text-muted-foreground/80 mt-1">
            Standard ports: 8080 - 8085
          </p>
        </div>
      </div>
    </aside>
  );
}

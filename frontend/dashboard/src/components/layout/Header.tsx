import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Moon, Sun, RefreshCw, Shield, Menu } from "lucide-react";

export function Header() {
  const { theme, toggleTheme, autoRefresh, toggleAutoRefresh, toggleSidebar } =
    useAppStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-foreground text-base">
                  Phylax
                </span>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  v0.1.0
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAutoRefresh}
            className="h-8 gap-2 text-xs"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                autoRefresh ? "animate-spin text-emerald-400" : "text-muted-foreground"
              }`}
              style={{ animationDuration: "3s" }}
            />
            <span className="hidden sm:inline">
              {autoRefresh ? "Live Sync" : "Paused"}
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

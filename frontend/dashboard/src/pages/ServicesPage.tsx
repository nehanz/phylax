import { MICROSERVICES } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Terminal } from "lucide-react";
import { useState } from "react";

export function ServicesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCurl = (port: number, id: string) => {
    navigator.clipboard.writeText(`curl http://localhost:${port}/api/health`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Microservices Registry
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Internal service specifications, roles, and direct curl endpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MICROSERVICES.map((svc) => (
          <Card key={svc.id} className="border-border/60 bg-card/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">{svc.name}</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  {svc.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono">
                  Port {svc.port}
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {svc.role}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-background/70 border border-border/50 font-mono text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  <span>curl http://localhost:{svc.port}/api/health</span>
                </div>
                <button
                  onClick={() => copyCurl(svc.port, svc.id)}
                  className="flex items-center gap-1 text-[11px] hover:text-foreground transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedId === svc.id ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

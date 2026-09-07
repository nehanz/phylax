import { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-border bg-card/50">
      <div className="p-3 rounded-full bg-muted text-muted-foreground mb-3">
        {icon || <AlertCircle className="w-6 h-6" />}
      </div>
      <h4 className="text-base font-medium text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-4">
        {description}
      </p>
      {action}
    </div>
  );
}

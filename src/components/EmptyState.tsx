import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  filter?: string;
  title?: string;
  message?: string;
}

export default function EmptyState({ filter, title = "No data found", message }: EmptyStateProps) {
  return (
    <Card className="w-full border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-gray-100 p-3 mb-4">
          <AlertCircle className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground max-w-sm">
          {filter
            ? `No  matching results were found. Try a different search term.`
            : message || "When users access private files, their activity will appear here."}
        </p>
      </CardContent>
    </Card>
  );
}

import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title?: string;
}

export default function EmptyStateModal({ title }: Props) {
  return (
    <Card className="w-full border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-gray-100 p-3 mb-4">
          <AlertCircle className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">No {title} found</h3>
        <p className="text-gray-500 max-w-sm">
          No matching results were found. Try a different search.
        </p>
      </CardContent>
    </Card>
  );
}

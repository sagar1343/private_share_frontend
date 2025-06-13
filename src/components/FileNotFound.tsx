import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function FileNotFound() {
  return (
    <Card className="w-full border-dashed border-2 shadow-sm">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-gray-100 p-3 mb-4">
          <AlertCircle className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">File Not Found</h3>
        <p className="text-gray-500 max-w-md">
          The file you're trying to access doesn't seem to exist or may have been removed.
        </p>
      </CardContent>
    </Card>
  );
}

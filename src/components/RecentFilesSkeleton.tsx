import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function RecentFilesSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Files</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card
              key={index}
              className="border-l-2 border-l-primary flex flex-row w-full p-3 rounded-md"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="p-2 bg-primary/10 rounded-md w-10 h-10" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-48 mb-2" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

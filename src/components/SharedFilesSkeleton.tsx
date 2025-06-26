import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SharedFilesSkeleton() {
  return (
    <div>
      <div>
        <div className="sticky top-0 sm:static z-10 bg-background sm:bg-transparent border-b sm:border-b-0 border-border/20 sm:border-transparent pb-4 sm:pb-0 mb-4 sm:mb-6">
          <div className="flex gap-2">
            <div className="relative min-w-3xs">
              <Skeleton className="absolute left-2.5 top-2.5 h-4 w-4 rounded" />
              <Skeleton className="h-9 w-64 pl-8 rounded-md" />
            </div>
            <div className="relative">
              <Skeleton className="h-9 w-[66px] rounded-md" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_item, index) => (
          <Card
            key={`skeleton-${index}`}
            className="border-l-2 border-l-primary flex flex-row w-full p-3 rounded-md animate-pulse"
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-3">
                <Skeleton className="rounded-md size-10" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="rounded-full size-1" />
                    <div className="flex items-center gap-1">
                      <Skeleton className="rounded-md size-4" />
                      <Skeleton className="h-3 w-[100px]" />
                    </div>
                  </div>
                </div>
              </div>
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

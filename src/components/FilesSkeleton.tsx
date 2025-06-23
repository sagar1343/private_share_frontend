import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

export default function FileSkeleton() {
  return (
    <div className="space-y-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
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
      </div>
    </div>
  );
}

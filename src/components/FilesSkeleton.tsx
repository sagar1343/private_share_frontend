import { Skeleton } from "./ui/skeleton";

export default function FileSkeleton() {
  return (
    <div className="space-y-4 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 12 }).map((_) => (
        <Skeleton className="h-[92px]" />
      ))}
    </div>
  );
}

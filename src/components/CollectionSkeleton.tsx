// This file is unused and will be deleted or ignored.
import { Skeleton } from "./ui/skeleton";

export default function CollectionSkeleton() {
  return (
    <div className="w-full flex flex-col h-full">
      {/* Search and Sort Bar Skeleton */}
      <div className="sticky top-0 sm:static z-10 bg-background sm:bg-transparent border-b sm:border-b-0 border-border/20 sm:border-transparent pb-4 sm:pb-0 mb-4 sm:mb-6">
        <div className="flex gap-2">
          {/* Search Bar Skeleton */}
          <div className="relative min-w-3xs">
            <Skeleton className="absolute left-2.5 top-2.5 h-4 w-4 rounded" />
            <Skeleton className="h-9 w-64 pl-8 rounded-md" />
          </div>
          {/* Sort Dropdown Skeleton */}
          <div className="relative">
            <Skeleton className="h-9 w-36 rounded-md" />
          </div>
        </div>
      </div>

      {/* Collections Grid Skeleton */}
      <div className="flex-1 overflow-y-auto sm:overflow-visible">
        <ul className="grid grid-cols-3 lg:grid-cols-6 gap-x-6 justify-items-center items-center sm:justify-items-start">
          {Array.from({ length: 18 }).map((_, index) => (
            <li key={index} className="rounded-md">
              <figure className="flex flex-col items-center cursor-pointer rounded-md">
                <Skeleton className="w-[82px] h-[82px] rounded-md" />
                <Skeleton className="h-4 w-20 mt-2 rounded" />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 
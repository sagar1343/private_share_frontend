import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { ArrowDownAZ, ArrowUpAZ, Calendar, FileDown, FileUp, Filter } from "lucide-react";
import type React from "react";

export type SortContext = "collections" | "files" | "received";

interface SortOption {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface Props {
  sort: string;
  setSort: (value: string) => void;
  context?: SortContext;
  className?: string;
}

export default function SortDropdown({ sort, setSort, context = "files", className = "" }: Props) {
  const allOptions: Record<string, SortOption> = {
    "title-asc": {
      label: "Title (A-Z)",
      value: "title-asc",
      icon: <ArrowDownAZ className="h-4 w-4 mr-2" />,
    },
    "title-desc": {
      label: "Title (Z-A)",
      value: "title-desc",
      icon: <ArrowUpAZ className="h-4 w-4 mr-2" />,
    },
    "date-desc": {
      label: "Newest First",
      value: "date-desc",
      icon: <Calendar className="h-4 w-4 mr-2" />,
    },
    "date-asc": {
      label: "Oldest First",
      value: "date-asc",
      icon: <Calendar className="h-4 w-4 mr-2" />,
    },
    "size-asc": {
      label: "Size (Smallest)",
      value: "size-asc",
      icon: <FileDown className="h-4 w-4 mr-2" />,
    },
    "size-desc": {
      label: "Size (Largest)",
      value: "size-desc",
      icon: <FileUp className="h-4 w-4 mr-2" />,
    },
  };

  const contextOptions: Record<SortContext, string[]> = {
    collections: ["title-asc", "title-desc", "date-desc", "date-asc"],
    files: ["date-desc", "date-asc", "title-asc", "title-desc", "size-desc", "size-asc"],
    received: ["date-desc", "date-asc", "title-asc", "title-desc", "size-desc", "size-asc"],
  };

  const options = contextOptions[context].map((key) => allOptions[key]);

  return (
    <div className={`relative ${className}`}>
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-full min-w-[44px] bg-background hover:bg-muted/50 transition-colors border-input">
          <div className="flex items-center">
            <Filter className="h-4 w-4" />
          </div>
        </SelectTrigger>

        <SelectContent className="min-w-[200px]" align="end">
          <div className="py-2 px-3 text-xs font-medium text-muted-foreground border-b border-border mb-1">
            SORT BY
          </div>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer focus:bg-muted"
            >
              <div className="flex items-center w-full">
                {option.icon}
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

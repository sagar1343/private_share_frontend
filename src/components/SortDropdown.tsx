import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { ArrowDownAZ, ArrowUpAZ, Calendar, FileDown, Filter } from "lucide-react";
import type React from "react";

export type SortContext = "collections" | "files" | "received";

interface Props {
  sort: string;
  setSort: (value: string) => void;
  context?: SortContext;
  className?: string;
}

const FIELD_OPTIONS: Record<
  SortContext,
  { value: string; label: string; icon: React.ReactNode }[]
> = {
  collections: [
    { value: "created_at", label: "Date", icon: <Calendar className="h-4 w-4 mr-2" /> },
    { value: "title", label: "Title", icon: <ArrowDownAZ className="h-4 w-4 mr-2" /> },
  ],
  files: [
    { value: "created_at", label: "Date", icon: <Calendar className="h-4 w-4 mr-2" /> },
    { value: "file_name", label: "Title", icon: <ArrowDownAZ className="h-4 w-4 mr-2" /> },
    { value: "size", label: "Size", icon: <FileDown className="h-4 w-4 mr-2" /> },
  ],
  received: [
    { value: "created_at", label: "Date", icon: <Calendar className="h-4 w-4 mr-2" /> },
    { value: "file_name", label: "Title", icon: <ArrowDownAZ className="h-4 w-4 mr-2" /> },
    { value: "size", label: "Size", icon: <FileDown className="h-4 w-4 mr-2" /> },
  ],
};

const DIRECTION_OPTIONS = [
  { value: "asc", label: "Ascending", icon: <ArrowDownAZ className="h-4 w-4 mr-2" /> },
  { value: "desc", label: "Descending", icon: <ArrowUpAZ className="h-4 w-4 mr-2" /> },
];

export default function SortDropdown({ sort, setSort, context = "files", className = "" }: Props) {
  const fields = FIELD_OPTIONS[context];
  const { field, direction } = (() => {
    if (sort.startsWith("-")) return { field: sort.slice(1), direction: "desc" };
    return { field: sort, direction: "asc" };
  })();

  function handleValueChange(value: string) {
    if (value.startsWith("-") || value.startsWith("+")) {
      setSort(value.replace(/^\+/, ""));
      return;
    }

    setSort(value);
  }

  return (
    <div className={`relative ${className}`}>
      <Select value={sort} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full bg-background hover:bg-muted/50 transition-colors border-input">
          <div className="flex items-center">
            <Filter className="h-4 w-4" />
          </div>
        </SelectTrigger>
        <SelectContent className="min-w-[220px]" align="end">
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            {fields.map((option) => (
              <SelectItem
                key={option.value}
                value={direction === "desc" ? `-${option.value}` : option.value}
                className="cursor-pointer focus:bg-muted"
              >
                <div className="flex items-center w-full">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Order</SelectLabel>
            {DIRECTION_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value === "desc" ? `-${field}` : field}
                className="cursor-pointer focus:bg-muted"
              >
                <div className="flex items-center w-full">
                  {option.icon}
                  <span>
                    {field === "created_at"
                      ? option.value === "asc"
                        ? "Oldest"
                        : "Newest"
                      : field === "size"
                      ? option.value === "asc"
                        ? "Smallest"
                        : "Largest"
                      : option.value === "asc"
                      ? "A-Z"
                      : "Z-A"}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

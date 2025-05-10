import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Calendar,
  FileUp,
  FileDown,
  SortAsc,
} from "lucide-react";

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

export default function SortDropdown({
  sort,
  setSort,
  context = "files",
  className = "",
}: Props) {
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
      label: "Date (Newest)",
      value: "date-desc",
      icon: <Calendar className="h-4 w-4 mr-2" />,
    },
    "date-asc": {
      label: "Date (Oldest)",
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
    files: [
      "size-asc",
      "size-desc",
      "date-desc",
      "date-asc",
      "title-asc",
      "title-desc",
    ],
    received: ["title-asc", "title-desc", "size-asc", "size-desc"],
  };

  const options = contextOptions[context].map((key) => allOptions[key]);

  const selectedOption = allOptions[sort] || options[0];

  return (
    <div className={`relative ${className}`}>
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-full min-w-[180px] bg-white  hover:bg-gray-50 transition-colors">
          <div className="flex items-center">
            <SortAsc className="h-4 w-4 mr-2 text-gray-500" />
            <SelectValue placeholder="Sort by">
              {selectedOption?.label}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="min-w-[180px]">
          <div className="py-1 px-1 text-xs font-medium text-gray-500 border-b mb-1">
            SORT BY
          </div>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer"
            >
              <div className="flex items-center">
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Calendar, Clock, Filter } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const FILTER_OPTIONS = [
  { value: "all", label: "All", icon: <Filter className="h-4 w-4 mr-2" /> },
  { value: "today", label: "Today", icon: <Clock className="h-4 w-4 mr-2" /> },
  { value: "yesterday", label: "Yesterday", icon: <Calendar className="h-4 w-4 mr-2" /> },
];

export default function AccessLogsFilter({ value, onChange, className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-background hover:bg-muted/50 transition-colors border-input">
          <div className="flex items-center">
            <Filter className="h-4 w-4" />
          </div>
        </SelectTrigger>
        <SelectContent className="min-w-[180px]" align="end">
          <SelectGroup>
            <SelectLabel>Filter by</SelectLabel>
            {FILTER_OPTIONS.map((option) => (
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
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

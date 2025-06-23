import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function SearchComponent({ value, onChange, placeholder }: Props) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const debouncedOnChange = useCallback(
    debounce((val: string) => {
      if (val !== value) onChange(val);
    }, 800),
    [onChange, value]
  );

  useEffect(() => {
    debouncedOnChange(internalValue);
    return () => {
      debouncedOnChange.cancel();
    };
  }, [internalValue, debouncedOnChange]);

  return (
    <div className="relative min-w-3xs">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}

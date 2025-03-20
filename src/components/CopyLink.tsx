import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardCheck, Link } from "lucide-react";
import { useRef, useState } from "react";

export default function CopyLink() {
  const [copied, setCopied] = useState(false);
  const copyRef = useRef<HTMLInputElement | null>(null);

  const handleCopy = () => {
    if (copyRef.current) {
      navigator.clipboard.writeText(copyRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="my-12 flex gap-2 ">
      <Input
        ref={copyRef}
        className="max-w-2xs focus-visible:ring-0 focus-visible:border-inherit focus-visible:border-[1px]"
        defaultValue="http://localhost:8000/api/fileshare/1"
        readOnly
      />
      <Button
        type="submit"
        onClick={handleCopy}
        variant="default"
        className="cursor-pointer"
      >
        {!copied ? (
          <span className="flex gap-1 items-center">
            <Link />
            Copy
          </span>
        ) : (
          <span className="flex gap-1 items-center">
            <ClipboardCheck />
            Copied
          </span>
        )}
      </Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardCheck, Copy, Link } from "lucide-react";
import { useRef, useState } from "react";

export default function CopyLink({ encodedURL }: { encodedURL: string }) {
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
        className="w-2xs focus-visible:ring-0 focus-visible:border-inherit focus-visible:border-[1px]"
        defaultValue={encodedURL}
        readOnly
      />
      <Button type="submit" onClick={handleCopy} variant="default" className="cursor-pointer">
        {!copied ? <Copy /> : <ClipboardCheck />}
      </Button>
    </div>
  );
}

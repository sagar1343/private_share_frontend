import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Hashids from "hashids";
import { ClipboardCheck, Link } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CopyLink({ id }: { id: number }) {
  const [copied, setCopied] = useState(false);
  const copyRef = useRef<HTMLInputElement | null>(null);
  const [encodedId, setEncodedId] = useState<string | null>(null);

  const handleCopy = () => {
    if (copyRef.current) {
      navigator.clipboard.writeText(copyRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  useEffect(() => {
    const hashids = new Hashids("private-share-salt", 10);
    setEncodedId(hashids.encode(id));
  }, []);

  if (!encodedId) {
    return null;
  }

  return (
    <div className="my-12 flex gap-2 ">
      <Input
        ref={copyRef}
        className="max-w-2xs focus-visible:ring-0 focus-visible:border-inherit focus-visible:border-[1px]"
        defaultValue={`http://localhost:5173/share?id=${encodedId}`}
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

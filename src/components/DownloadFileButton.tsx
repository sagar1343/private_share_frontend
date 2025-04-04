import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleArrowDown } from "lucide-react";
import { FormEvent, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  fileId: number;
  isProtected: boolean;
}

export default function DownLoadFileButton({ fileId, isProtected }: Props) {
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function handleDownload(event?: FormEvent) {
    event?.preventDefault();
    const password = passwordRef.current?.value?.trim(); // Ensure password is valid
    await downloadFile(fileId, password);
  }

  return (
    <div>
      {isProtected ? (
        <Dialog modal>
          <DialogTrigger>
            <CircleArrowDown
              className="text-primary cursor-pointer flex-shrink-0 ml-8"
              size={30}
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>This file is encrypted with a password</DialogTitle>
              <DialogDescription asChild>
                <form onSubmit={handleDownload} className="flex gap-3 mt-4">
                  <Input ref={passwordRef} placeholder="Enter Password" />
                  <Button type="submit" className="cursor-pointer">
                    Confirm
                  </Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <CircleArrowDown
          onClick={() => handleDownload()}
          className="text-primary cursor-pointer flex-shrink-0 ml-8"
          size={30}
        />
      )}
    </div>
  );
}

async function downloadFile(fileId: number, password?: string) {
  console.log(fileId, password, "downloading");
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import { AxiosError } from "axios";
import { Download, Eye, EyeOff, Lock } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

interface DownloadFileButtonProps {
  fileId: number;
  isProtected: boolean;
  size?: number;
  className?: string;
}

export default function DownloadFileButton({
  fileId,
  isProtected,
  size = 30,
  className,
}: DownloadFileButtonProps) {
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleDownload(event?: FormEvent) {
    event?.preventDefault();
    setLoading(true);
    const password = passwordRef.current?.value?.trim();
    try {
      await downloadFile(fileId, password);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn("inline-flex", className)}>
      {isProtected ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Download size={size} aria-label="Download file" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lock size={18} className="text-primary" />
                Password Protected File
              </DialogTitle>
              <DialogDescription>
                This file is encrypted. Please enter the password to download.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleDownload} className="space-y-4 pt-2">
              <div className="relative">
                <Input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="pr-10"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff size={16} className="text-muted-foreground" />
                  ) : (
                    <Eye size={16} className="text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Downloading..." : "Download"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <Button onClick={() => handleDownload()} disabled={isLoading}>
          <Download size={size} aria-label="Download file" />
        </Button>
      )}
    </div>
  );
}

async function downloadFile(fileId: number, password?: string) {
  try {
    const response = await api.get(`/api/fileshare/${fileId}`, {
      params: password ? { password } : {},
    });

    const url = response.data;

    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("File downloaded successfully");
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message || "Failed to download file";
      toast.error(errorMessage);
    } else {
      toast.error("An unexpected error occurred");
    }
    throw error;
  }
}

import { Button } from "@/components/ui/button";
import api from "@/services/api";
import type { IFile } from "@/types/File";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  maxDownloads: number;
}

export default function MaxDownloadSection({ maxDownloads }: Props) {
  const { id } = useParams();
  const [count, setCount] = useState(maxDownloads);
  const queryClient = useQueryClient();

  const updateMaxDownloadsMutation = useMutation({
    mutationFn: async (newCount: number) => {
      const response = await api.patch<IFile>(`/api/files/${id}/`, {
        max_download_count: newCount,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setCount(data.max_download_count);
      toast.success("Maximum downloads updated successfully");
      queryClient.invalidateQueries({ queryKey: ["files", { id }] });
    },
    onError: () => {
      toast.error("Failed to update maximum downloads");
      setCount(maxDownloads);
    },
  });

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateMaxDownloadsMutation.mutate(newCount);
  };

  const decrement = () => {
    if (count <= 0) return;
    const newCount = count - 1;
    setCount(newCount);
    updateMaxDownloadsMutation.mutate(newCount);
  };

  return (
    <div>
      <h2 className="font-semibold flex items-center">Maximum downloads</h2>
      <div className="flex items-center gap-3 mt-2">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={count <= 0 || updateMaxDownloadsMutation.isPending}
          aria-label="Decrease maximum downloads"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <p className="text-foreground/70 min-w-[30px] text-center">{count}</p>

        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          disabled={updateMaxDownloadsMutation.isPending}
          aria-label="Increase maximum downloads"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

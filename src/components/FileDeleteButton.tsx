import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  fileId: number;
  collectionId: number;
}

export default function FileDeleteButton({ fileId, collectionId }: Props) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/api/files/${fileId}/`);
    },
    onSuccess: () => {
      toast.success("Succefully deleted");
      setOpen(false);
      navigate(`/dashboard/collections/${collectionId}`, { replace: true });

      queryClient.refetchQueries({
        queryKey: ["files"],
      });
    },
    onError: () => {
      toast.error("Failed to delete");
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription className="text-center">
            This action will permanently delete the file. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="default" onClick={() => mutation.mutate()}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

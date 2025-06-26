import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import { useCreateCollection } from "@/services/collectionService";
import { CollectionFormData } from "@/types/CollectionFormData";
import { Folder } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateCollectionDialog({ customTrigger }: { customTrigger?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { authenticatedUser } = useAuthContext();
  const createCollectionMutation = useCreateCollection();
  const { register, handleSubmit, reset, formState } = useForm<CollectionFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: CollectionFormData) => {
    try {
      const formattedData = {
        ...data,
        title: data.title.charAt(0).toUpperCase() + data.title.slice(1),
      };

      await createCollectionMutation.mutateAsync({
        userId: authenticatedUser?.id!,
        data: formattedData,
      });

      setOpen(false);
      reset();
      navigate("/dashboard/collections/");
    } catch (e) {}
  };

  useEffect(() => {
    if (formState.errors.title) toast.error(formState.errors.title.message);
  }, [formState]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {customTrigger ? (
          customTrigger
        ) : (
          <Button>
            <Folder className="mr-2 h-4 w-4" />
            New Collection
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:min-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Create New Collection</DialogTitle>
            <DialogDescription>Enter a name for your new collection.</DialogDescription>
          </DialogHeader>

          <Input
            id="title"
            placeholder="Enter collection name..."
            {...register("title", {
              required: "Collection name is required",
              minLength: {
                value: 2,
                message: "Collection name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Collection name must be less than 50 characters",
              },
            })}
            autoFocus
            disabled={createCollectionMutation.isPending}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createCollectionMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createCollectionMutation.isPending}>
              {createCollectionMutation.isPending ? "Creating..." : "Create Collection"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

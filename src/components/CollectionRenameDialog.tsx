import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateCollection } from "@/services/collectionService";
import { ICollection } from "@/types/Collection";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collection: ICollection;
}

export default function CollectionRenameDialog({ open, onOpenChange, collection }: Props) {
  const updateCollectionMutation = useUpdateCollection();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: { title: collection.title },
  });

  const handleRename = async (data: { title: string }) => {
    if (data.title === collection.title) {
      onOpenChange(false);
      return;
    }
    try {
      await updateCollectionMutation.mutateAsync({
        userId: collection.user,
        collectionId: collection.id,
        data,
      });
      onOpenChange(false);
      reset({ title: data.title });
    } catch (error) {}
  };

  useEffect(() => {
    if (formState.errors.title) toast.error(formState.errors.title.message);
  }, [formState]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(handleRename)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Rename Collection</DialogTitle>
            <DialogDescription>Give your collection a new name.</DialogDescription>
          </DialogHeader>
          <Input
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
            className="border-primary/20 focus-visible:ring-primary"
            placeholder="Enter collection name"
            autoFocus
            disabled={updateCollectionMutation.isPending}
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateCollectionMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              disabled={formState.isSubmitting || updateCollectionMutation.isPending}
            >
              {updateCollectionMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

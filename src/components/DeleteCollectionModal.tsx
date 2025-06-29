import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteCollection } from "@/services/collectionService";
import { useAuthContext } from "@/context/AuthContext";

interface Props {
  collectionId: number;
  isOpen: boolean;
  handleClose: () => void;
}

export default function DeleteCollectionDialog({
  collectionId,
  isOpen,
  handleClose,
}: Props) {
  const { authenticatedUser } = useAuthContext();
  const deleteCollectionMutation = useDeleteCollection();

  const handleDelete = async () => {
    try {
      await deleteCollectionMutation.mutateAsync({
        userId: authenticatedUser?.id!,
        collectionId,
      });
      handleClose();
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center ">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action is irreversible and will permanently delete the
            collection and its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-center space-x-5">
            <AlertDialogCancel 
              onClick={handleClose} 
              className="cursor-pointer"
              disabled={deleteCollectionMutation.isPending}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-primary text-white hover:bg-primary/80 cursor-pointer"
              disabled={deleteCollectionMutation.isPending}
            >
              {deleteCollectionMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
import { useAuthContext } from "@/context/AuthContext";
import { useCollections } from "@/context/CollectionsContext";
import api from "@/services/api";

interface DeleteCollectionDialogProps {
  collectionId: number;
  isOpen: boolean;
  handleClose: () => void;
}

export default function DeleteCollectionDialog({
  collectionId,
  isOpen,
  handleClose,
}: DeleteCollectionDialogProps) {
  const { authenticatedUser } = useAuthContext();
  const { setDeleting } = useCollections();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(
        `api/users/${authenticatedUser?.id}/collections/${collectionId}/`
      );
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
      handleClose();
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
            <AlertDialogCancel onClick={handleClose} className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-primary text-white hover:bg-primary/80 cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

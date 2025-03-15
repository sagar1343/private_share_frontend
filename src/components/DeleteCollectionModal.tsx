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
import api from "@/services/api";
import { useCollections } from "@/context/CollectionsContext";

interface DeleteCollectionDialogProps {
  collectionId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteCollectionDialog({
  collectionId,
  isOpen,
  onClose,
}: DeleteCollectionDialogProps) {
  const { authenticatedUser } = useAuthContext();
  const { setDeleting } = useCollections();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(
        `api/users/${authenticatedUser?.id}/collections/${collectionId}/`
      );
      console.log("Collection deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            collection and its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-between">
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-white text-black hover:bg-gray-200 cursor-pointer"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

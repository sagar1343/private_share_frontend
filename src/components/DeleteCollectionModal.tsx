import { AppDispatch } from "@/app/store";
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
import {
  CollectionActionStatus,
  setActionStatus,
} from "@/features/collection/collectionSlice";
import api from "@/services/api";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    dispatch(setActionStatus(CollectionActionStatus.DELETING));
    try {
      await api.delete(
        `api/users/${authenticatedUser?.id}/collections/${collectionId}/`
      );
      toast.success("Collection deleted successfully");
    } catch (error) {
      toast.error("Failed to delete collection, Try later.");
    } finally {
      dispatch(setActionStatus(CollectionActionStatus.IDLE));
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

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
import useManageCollection from "@/hooks/useManageCollection";

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
  const { handleDelete } = useManageCollection();

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
              onClick={() => handleDelete(collectionId, handleClose)}
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

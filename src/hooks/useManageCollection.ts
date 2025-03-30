import { AppDispatch } from "@/app/store";
import { useAuthContext } from "@/context/AuthContext";
import {
  CollectionActionStatus,
  setActionStatus,
} from "@/features/collection/collectionSlice";
import api from "@/services/api";
import { ICollection } from "@/types/Collection";
import { CollectionFormData } from "@/types/CollectionFormData";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function useManageCollection() {
  const { authenticatedUser } = useAuthContext();
  const dispatch = useDispatch<AppDispatch>();

  async function handleRename(
    collection: ICollection,
    setRenameId: React.Dispatch<React.SetStateAction<number | null>>,
    data: CollectionFormData
  ) {
    if (data.title == collection.title) {
      setRenameId(null);
      return;
    }
    try {
      const response = await api.patch(
        `/api/users/${authenticatedUser?.id}/collections/${collection.id}/`,
        data
      );
      if (response.status === 200) {
        dispatch(setActionStatus(CollectionActionStatus.IDLE));
        setRenameId(null);
        toast.success("Updated Successfully");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.title || "An error occurred");
      }
    }
  }
  async function handleCreate(data: CollectionFormData) {
    try {
      const response = await api.post(
        `api/users/${authenticatedUser?.id}/collections/`,
        { ...data, user: authenticatedUser?.id }
      );
      if (response.status === 201) {
        dispatch(setActionStatus(CollectionActionStatus.IDLE));
        toast.success("Created Successfully");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.info(error.response?.data?.title || "An error occurred");
      }
    }
  }
  return { handleCreate, handleRename };
}

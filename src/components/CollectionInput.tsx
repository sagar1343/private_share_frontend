import { AppDispatch } from "@/app/store";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import {
  CollectionActionStatus,
  setActionStatus,
} from "@/features/collection/collectionSlice";
import api from "@/services/api";
import { AxiosError } from "axios";
import { Folder } from "lucide-react";
import { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function CollectionInput() {
  const { authenticatedUser } = useAuthContext();
  const titleRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!titleRef.current) return;
    try {
      const response = await api.post(
        `api/users/${authenticatedUser?.id}/collections/`,
        { title: titleRef.current.value, user: authenticatedUser?.id }
      );
      if (response.status === 201)
        dispatch(setActionStatus(CollectionActionStatus.IDLE));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.info(error.response?.data?.title || "An error occurred", {});
      }
    }
  }

  return (
    <figure className="flex flex-col items-center">
      <Folder size={82} fill="#008CFC" stroke="1" />
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          ref={titleRef}
          className="max-w-[100px] focus-visible:ring-0"
        />
      </form>
    </figure>
  );
}

import { AppDispatch } from "@/app/store";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import {
  CollectionActionStatus,
  setActionStatus,
} from "@/features/collection/collectionSlice";
import api from "@/services/api";
import { AxiosError } from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface RenameInputProps {
  title: string;
  collectionId: number;
  onRenameComplete: () => void;
}

export default function RenameInput({
  title,
  collectionId,
  onRenameComplete,
}: RenameInputProps) {
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const { authenticatedUser } = useAuthContext();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!inputRef.current) return;
    if (newTitle === title) {
      onRenameComplete();
      return;
    }

    try {
      const response = await api.patch(
        `/api/users/${authenticatedUser?.id}/collections/${collectionId}/`,
        { title: newTitle }
      );
      if (response.status === 200) {
        dispatch(setActionStatus(CollectionActionStatus.IDLE));
        onRenameComplete();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.title || "An error occurred");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        className="max-w-[100px] focus-visible:ring-0"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
    </form>
  );
}

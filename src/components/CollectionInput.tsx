import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import useCollection from "@/hooks/useCollections";
import api from "@/services/api";
import { Folder } from "lucide-react";
import { FormEvent, useRef } from "react";

interface Props {
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CollectionInput({ setCreating }: Props) {
  const { authenticatedUser } = useAuthContext();
  const { refreshCollections } = useCollection();
  const titleRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!titleRef.current) return;
    try {
      const response = await api.post(
        `api/users/${authenticatedUser?.id}/collections/`,
        { title: titleRef.current.value, user: authenticatedUser?.id }
      );
      if (response.status === 201) {
        refreshCollections();
        setCreating(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <figure className="flex flex-col items-center">
      <Folder size={82} fill="#008CFC" stroke="1" />
      <form onSubmit={handleSubmit}>
        <Input autoFocus ref={titleRef} className="max-w-[100px]" />
      </form>
    </figure>
  );
}

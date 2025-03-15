import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import { useCollections } from "@/context/CollectionsContext";
import api from "@/services/api";
import { Folder } from "lucide-react";
import { FormEvent, useRef } from "react";

export default function CollectionInput() {
  const { authenticatedUser } = useAuthContext();
  const { setCreating } = useCollections();
  const titleRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!titleRef.current) return;
    try {
      const response = await api.post(
        `api/users/${authenticatedUser?.id}/collections/`,
        { title: titleRef.current.value, user: authenticatedUser?.id }
      );
      if (response.status === 201) setCreating(false);
    } catch (error) {
      console.log(error);
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

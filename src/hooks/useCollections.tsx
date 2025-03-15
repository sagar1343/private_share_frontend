import { useAuthContext } from "@/context/AuthContext";
import api from "@/services/api";
import { ICollection } from "@/types/Collection";
import { useEffect, useState } from "react";

export default function useCollection() {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const { authenticatedUser } = useAuthContext();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshCollections = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  async function fetchCollection() {
    try {
      const response = await api.get(
        `api/users/${authenticatedUser?.id}/collections`
      );
      setCollections(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCollection();
  }, [refreshTrigger]);

  return { collections, refreshCollections };
}

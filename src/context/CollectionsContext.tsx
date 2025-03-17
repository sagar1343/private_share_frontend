import { useAuthContext } from "@/context/AuthContext";
import api from "@/services/api";
import { ICollection } from "@/types/Collection";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ICollectionContext {
  collections: ICollection[];
  isLoading: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollectionsContext = createContext<ICollectionContext | null>(null);

interface Props {
  children: ReactNode;
}

export default function CollectionsProvider({ children }: Props) {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isCreating, setCreating] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const { authenticatedUser } = useAuthContext();

  async function fetchCollection() {
    setLoading(true);
    try {
      const response = await api.get(
        `api/users/${authenticatedUser?.id}/collections`
      );
      setCollections(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (
      authenticatedUser?.id &&
      isCreating === false &&
      isDeleting === false &&
      isUpdating === false
    ) {
      fetchCollection();
    }
  }, [isCreating, authenticatedUser, isDeleting, isUpdating]);

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        isLoading,
        isCreating,
        setCreating,
        isDeleting,
        setDeleting,
        isUpdating,
        setUpdating,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}

export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (!context) throw new Error("Collection context is not provided!");
  return context;
};

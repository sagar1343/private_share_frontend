import api from "@/services/api";
import { ICollection } from "@/types/Collection";
import { CollectionColorData, CollectionFormData } from "@/types/CollectionFormData";
import { PaginatedResponse } from "@/types/Pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const collectionKeys = {
  all: ["collections"] as const,
  lists: () => [...collectionKeys.all, "list"] as const,
  list: (filters: { userId: number; page: number; searchTerm?: string; sort?: string }) =>
    [...collectionKeys.lists(), filters] as const,
  details: () => [...collectionKeys.all, "detail"] as const,
  detail: (id: number) => [...collectionKeys.details(), id] as const,
};

export const fetchCollections = async (
  userId: number,
  page: number,
  searchTerm?: string,
  ordering?: string
) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (searchTerm?.trim()) params.append("search", searchTerm.trim());
  if (ordering) params.append("ordering", ordering);
  const response = await api.get<PaginatedResponse<ICollection>>(
    `api/users/${userId}/collections/?${params.toString()}`
  );
  return response.data;
};

export const createCollection = async ({
  userId,
  data,
}: {
  userId: number;
  data: CollectionFormData;
}): Promise<ICollection> => {
  const response = await api.post<ICollection>(`api/users/${userId}/collections/`, {
    ...data,
    user: userId,
  });
  return response.data;
};

export const updateCollection = async ({
  userId,
  collectionId,
  data,
}: {
  userId: number;
  collectionId: number;
  data: CollectionFormData | CollectionColorData;
}): Promise<ICollection> => {
  const response = await api.patch<ICollection>(
    `api/users/${userId}/collections/${collectionId}/`,
    data
  );
  return response.data;
};

export const deleteCollection = async ({
  userId,
  collectionId,
}: {
  userId: number;
  collectionId: number;
}): Promise<void> => {
  await api.delete(`api/users/${userId}/collections/${collectionId}/`);
};

export const useCollections = (
  userId: number,
  page: number,
  searchTerm?: string,
  ordering?: string
) => {
  return useQuery({
    queryKey: ["collections", userId, page, searchTerm, ordering],
    queryFn: () => fetchCollections(userId, page, searchTerm, ordering),
    enabled: !!userId,
  });
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollection,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: collectionKeys.lists() });

      queryClient.setQueryData(
        collectionKeys.list({
          userId: variables.userId,
          page: 1,
          searchTerm: "",
          sort: "date-desc",
        }),
        (oldData: PaginatedResponse<ICollection> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            count: oldData.count + 1,
            results: [data, ...oldData.results],
          };
        }
      );
      toast.success("Created Successfully");
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as { title?: string } | undefined;
      toast.info(errorData?.title || "An error occurred");
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCollection,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: collectionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: collectionKeys.detail(variables.collectionId) });

      queryClient.setQueryData(collectionKeys.detail(variables.collectionId), data);

      toast.success("Updated Successfully");
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as { title?: string } | undefined;
      toast.error(errorData?.title || "An error occurred");
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollection,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: collectionKeys.lists() });

      queryClient.removeQueries({ queryKey: collectionKeys.detail(variables.collectionId) });

      toast.success("Collection deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete collection, Try later.");
    },
  });
};

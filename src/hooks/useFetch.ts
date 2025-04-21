import api from "@/services/api";
import { QueryKey, useQuery } from "@tanstack/react-query";

export default function useFetch<T>(queryKey: QueryKey, endpoint: string) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await api.get<T>(endpoint);
      return response.data;
    },
    enabled: !!endpoint,
  });
}

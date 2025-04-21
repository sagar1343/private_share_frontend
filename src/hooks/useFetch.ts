import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export default function useFetch<T>(endpoint: string) {
  return useQuery({
    queryKey: ["fetch", endpoint],
    queryFn: async () => {
      const response = await api.get<T>(endpoint);
      return response.data;
    },
    enabled: !!endpoint,
  });
}

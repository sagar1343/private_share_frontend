import api from "@/services/api";
import { AxiosError } from "axios";
import { useEffect, useState, useTransition } from "react";

export default function useFetch<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [errors, setErrors] = useState<AxiosError | null>(null);
  const [isPending, startTransition] = useTransition();

  async function fetchData() {
    startTransition(async () => {
      try {
        const response = await api.get<T>(endpoint);
        startTransition(() => {
          setData(response.data);
          setErrors(null);
        });
      } catch (error) {
        if (error instanceof AxiosError)
          startTransition(() => {
            setErrors(error);
          });
      }
    });
  }

  useEffect(() => {
    if (endpoint) fetchData();
  }, [endpoint]);

  return { data, errors, loading: isPending };
}

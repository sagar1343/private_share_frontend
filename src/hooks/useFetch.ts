import api from "@/services/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function useFetch<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [errors, setErrors] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await api.get<T>(endpoint);
      setData(response.data);
      setErrors(null);
    } catch (error) {
      if (error instanceof AxiosError) setErrors(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (endpoint) fetchData();
  }, [endpoint]);

  return { data, errors, loading };
}

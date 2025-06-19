import api from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { Params, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

interface Error {
  file_name?: string[];
  file?: string[];
  expiration_time?: string[];
  password?: string[];
  collections?: string[];
  max_download_count?: string[];
}

export default function useSecureFile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { collectionId }: Params = useParams();
  const [errors, setErrors] = useState<Error | null>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["secure_file_upload"],
    mutationFn: async (data: FieldValues) => {
      const response = await api.post("/api/files/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["collections", { id: collectionId }],
      });
      navigate(`/dashboard/collections/${collectionId}/files/${data.id}`);
      toast.success("Secured file successfully");
    },
    onError: (error: AxiosError<Error>) => {
      setErrors(error.response?.data || null);
    },
  });

  function onSubmit(data: FieldValues) {
    mutate(data);
  }

  return { onSubmit, isPending, errors };
}

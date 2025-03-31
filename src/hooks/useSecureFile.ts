import api from "@/services/api";
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
  const navigate = useNavigate();
  const { collectionId }: Params = useParams();
  const [errors, setErrors] = useState<Error | null>();
  async function onSubmit(data: FieldValues) {
    setErrors(null);
    try {
      const response = await api.post("/api/files/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        navigate(`/collections/${collectionId}`);
        toast.success("Secured file successfully");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrors(error.response?.data);
      }
    }
  }
  return { onSubmit, errors };
}

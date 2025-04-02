import api from "@/services/api";
import { AxiosError } from "axios";
import { CircleArrowDown } from "lucide-react";
import { toast } from "sonner";

interface Props {
  fileId: number;
}
export default function DownLoadFileButton({ fileId }: Props) {
  async function handleDownload() {
    try {
      await api.get(`/api/fileshare/${fileId}/`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.warning(error.response?.data.message);
      }
    }
  }
  return (
    <CircleArrowDown
      onClick={handleDownload}
      className="text-primary cursor-pointer flex-shrink-0 ml-8"
      size={30}
    />
  );
}

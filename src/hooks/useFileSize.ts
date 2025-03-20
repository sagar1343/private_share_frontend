import axios from "axios";

export default function useFileSize() {
  async function getFileSize(url: string) {
    const response = await axios.get(url, { responseType: "blob" });
    const size_in_MB = response.data.size / (1024 * 1024);
    return size_in_MB;
  }
  return getFileSize;
}

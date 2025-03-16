export interface IFile {
  id: number;
  file: string;
  file_name: string;
  collections: number[];
  expiration_time: string;
  max_download_count: number;
  download_count: number;
  created_at: string;
}

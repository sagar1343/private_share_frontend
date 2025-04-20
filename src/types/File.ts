export interface IFile {
  id: number;
  file: string;
  file_name: string;
  size: string;
  collections: number[];
  expiration_time: string;
  max_download_count: number;
  download_count: number;
  is_protected: boolean;
  created_at: string;
}

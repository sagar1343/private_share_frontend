export interface IFile {
  id: number;
  file: string;
  file_name: string;
  size: string;
  starred: boolean;
  collection: number;
  expiration_time: string;
  max_download_count: number;
  download_count: number;
  is_protected: boolean;
  created_at: string;
  updated_at: string;
}

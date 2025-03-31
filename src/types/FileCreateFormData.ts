export interface FormData {
  file_name: string;
  file: File;
  expiration_time: Date;
  password?: string;
  collections: number | number[];
  max_download_count: number;
}

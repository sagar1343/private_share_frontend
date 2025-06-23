export interface DashboardResponse {
  total_collection: number;
  total_files: number;
  total_shared_files: number;
  storage_used: string;
  max_allowed_storage: string;
  recently_expired_files: number;
  starred_files: number;
}

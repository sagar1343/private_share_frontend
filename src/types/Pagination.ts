export interface PaginatedResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
  page_size: number;
  current_page?: number;
}

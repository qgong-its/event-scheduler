export interface LoginResponse {
  token: string;
}

export interface ApiError {
  message: string;
}

export interface PaginatedResponse<T> {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  results: T[];
}

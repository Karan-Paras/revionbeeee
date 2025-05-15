export type Method = "POST" | "GET";

export interface ApiSuccessResponse<T> {
  token?: string;
  status: 200;
  message: string;
  data: T;
  totalCount?: number;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type Method = "POST" | "GET";

export interface ApiSuccessResponse<T> {
  token?: string;
  status: 200;
  code?: number;
  message: string;
  data: T;
  totalQuestions?: number;
}

export interface ApiErrorResponse {
  status: number;
  code?: number;
  message: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

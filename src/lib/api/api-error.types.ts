export interface ApiErrorBody {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

export interface NormalizedApiError {
  status: number;
  message: string;
  code:
    | "AUTH_REQUIRED"
    | "NOT_FOUND"
    | "VALIDATION"
    | "SERVER"
    | "NETWORK"
    | "UNKNOWN";
}

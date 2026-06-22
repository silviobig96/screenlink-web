import { publicEnv } from "@/lib/config/env";
import { ApiError, normalizeApiError } from "./api-error";
import type {
  ApiClient,
  ApiRequestOptions,
  GetToken,
} from "./api-client.types";

export function createApiClient(getToken: GetToken): ApiClient {
  return {
    async request<TResponse, TBody = never>(
      path: string,
      options: ApiRequestOptions<TBody> = {},
    ) {
      const token = await getToken();
      if (!token)
        throw new ApiError({
          status: 401,
          code: "AUTH_REQUIRED",
          message: "Your session has expired. Please sign in again.",
        });

      let response: Response;
      try {
        response = await fetch(
          new URL(path, publicEnv.NEXT_PUBLIC_API_BASE_URL),
          {
            ...options,
            body:
              options.body === undefined
                ? undefined
                : JSON.stringify(options.body),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              ...options.headers,
            },
          },
        );
      } catch {
        throw new ApiError(await normalizeApiError());
      }

      if (!response.ok) throw new ApiError(await normalizeApiError(response));
      if (response.status === 204) return undefined as TResponse;
      const data: unknown = await response.json();
      return (options.schema ? options.schema.parse(data) : data) as TResponse;
    },
  };
}

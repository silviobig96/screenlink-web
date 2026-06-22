import type { ApiErrorBody, NormalizedApiError } from "./api-error.types";

const fallbackMessages: Record<NormalizedApiError["code"], string> = {
  AUTH_REQUIRED: "Your session has expired. Please sign in again.",
  NOT_FOUND: "The requested ScreenLink resource was not found.",
  VALIDATION:
    "The request could not be completed. Check the information and try again.",
  SERVER: "ScreenLink is temporarily unavailable. Please try again.",
  NETWORK: "Could not reach ScreenLink. Check your connection and try again.",
  UNKNOWN: "Something went wrong. Please try again.",
};

function getCode(status: number): NormalizedApiError["code"] {
  if (status === 401 || status === 403) return "AUTH_REQUIRED";
  if (status === 404) return "NOT_FOUND";
  if (status >= 400 && status < 500) return "VALIDATION";
  if (status >= 500) return "SERVER";
  return "UNKNOWN";
}

export async function normalizeApiError(
  response?: Response,
): Promise<NormalizedApiError> {
  if (!response)
    return { status: 0, code: "NETWORK", message: fallbackMessages.NETWORK };
  const code = getCode(response.status);
  let body: ApiErrorBody | undefined;
  try {
    body = (await response.json()) as ApiErrorBody;
  } catch {
    body = undefined;
  }

  const safeBackendMessage = Array.isArray(body?.message)
    ? body.message[0]
    : body?.message;
  const message =
    code === "VALIDATION" && safeBackendMessage
      ? safeBackendMessage
      : fallbackMessages[code];
  return { status: response.status, code, message };
}

export class ApiError extends Error {
  constructor(public readonly details: NormalizedApiError) {
    super(details.message);
    this.name = "ApiError";
  }
}

export function getErrorMessage(error: unknown) {
  return error instanceof ApiError ? error.message : fallbackMessages.UNKNOWN;
}

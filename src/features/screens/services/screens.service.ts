import type { ApiClient } from "@/lib/api/api-client.types";
import { screenSchema, screensResponseSchema } from "../schemas/screen.schema";
import type { Screen } from "../types/screen.types";

export const screensService = {
  list: (client: ApiClient) =>
    client.request<Screen[]>("/screens", { schema: screensResponseSchema }),
  get: (client: ApiClient, screenId: string) =>
    client.request<Screen>(`/screens/${encodeURIComponent(screenId)}`, {
      schema: screenSchema,
    }),
};

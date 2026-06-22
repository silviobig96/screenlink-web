import type { ApiClient } from "@/lib/api/api-client.types";
import { pairingResponseSchema } from "../schemas/pairing.schema";
import type { PairingRequest, PairingResponse } from "../types/pairing.types";

export const pairingService = {
  confirm: (client: ApiClient, request: PairingRequest) =>
    client.request<PairingResponse, PairingRequest>("/pairing/confirm", {
      method: "POST",
      body: request,
      schema: pairingResponseSchema,
    }),
};

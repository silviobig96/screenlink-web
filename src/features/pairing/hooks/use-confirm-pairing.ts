"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api/use-api-client";
import { screenKeys } from "@/features/screens/hooks/use-screens";
import { pairingService } from "../services/pairing.service";

export function useConfirmPairing() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => pairingService.confirm(client, { code }),
    onSuccess: async ({ screenId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: screenKeys.all }),
        queryClient.invalidateQueries({
          queryKey: screenKeys.detail(screenId),
        }),
      ]);
    },
  });
}

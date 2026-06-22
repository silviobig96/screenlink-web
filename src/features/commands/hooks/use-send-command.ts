"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api/use-api-client";
import { screenKeys } from "@/features/screens/hooks/use-screens";
import { commandsService } from "../services/commands.service";
import type { CommandRequest } from "../types/command.types";

export function useSendCommand(screenId: string) {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: CommandRequest) =>
      commandsService.send(client, screenId, command),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: screenKeys.detail(screenId) }),
  });
}

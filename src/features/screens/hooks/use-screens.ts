"use client";

import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api/use-api-client";
import { screensService } from "../services/screens.service";

export const screenKeys = {
  all: ["screens"] as const,
  detail: (id: string) => ["screens", id] as const,
};

export function useScreens() {
  const client = useApiClient();
  return useQuery({
    queryKey: screenKeys.all,
    queryFn: () => screensService.list(client),
  });
}

export function useScreen(screenId: string) {
  const client = useApiClient();
  return useQuery({
    queryKey: screenKeys.detail(screenId),
    queryFn: () => screensService.get(client, screenId),
    enabled: Boolean(screenId),
  });
}

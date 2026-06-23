"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api/use-api-client";
import { mediaService } from "../services/media.service";

export const mediaKeys = {
  all: ["media"] as const,
};

export function useMediaLibrary() {
  const client = useApiClient();
  return useQuery({
    queryKey: mediaKeys.all,
    queryFn: () => mediaService.list(client),
  });
}

export function useDeleteMedia() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mediaAssetId: string) =>
      mediaService.delete(client, mediaAssetId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: mediaKeys.all }),
  });
}

export function useUploadMedia() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      file,
      onProgress,
    }: {
      file: File;
      onProgress?: (progress: number) => void;
    }) => mediaService.uploadFile(client, file, onProgress),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: mediaKeys.all }),
  });
}

import type { ApiClient } from "@/lib/api/api-client.types";
import type { CommandRequest, CommandResponse } from "../types/command.types";

export const commandsService = {
  send: (client: ApiClient, screenId: string, command: CommandRequest) =>
    client.request<CommandResponse, CommandRequest>(
      `/screens/${encodeURIComponent(screenId)}/commands`,
      { method: "POST", body: command },
    ),
};

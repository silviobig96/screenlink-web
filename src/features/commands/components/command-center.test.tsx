import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CommandCenter } from "./command-center";

vi.mock("@/features/media/hooks/use-media", () => ({
  useMediaLibrary: vi.fn(),
}));

vi.mock("../hooks/use-send-command", () => ({
  useSendCommand: vi.fn(),
}));

const { useMediaLibrary } = await import("@/features/media/hooks/use-media");
const { useSendCommand } = await import("../hooks/use-send-command");
const useMediaLibraryMock = vi.mocked(useMediaLibrary);
const useSendCommandMock = vi.mocked(useSendCommand);

describe("CommandCenter media library selector", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSendCommandMock.mockReturnValue({
      isPending: false,
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSendCommand>);
  });

  it("lists ready image and video assets in the matching command selectors", () => {
    useMediaLibraryMock.mockReturnValue({
      data: [
        {
          createdAt: "2026-06-23T10:00:00.000Z",
          filename: "image.png",
          id: "image-1",
          mimeType: "image/png",
          originalFilename: "image.png",
          previewUrl: "https://signed.example.com/image.png",
          sizeBytes: 1024,
          status: "ready",
          type: "image",
          updatedAt: "2026-06-23T10:00:00.000Z",
        },
        {
          createdAt: "2026-06-23T10:00:00.000Z",
          filename: "video.mp4",
          id: "video-1",
          mimeType: "video/mp4",
          originalFilename: "video.mp4",
          previewUrl: "https://signed.example.com/video.mp4",
          sizeBytes: 2048,
          status: "ready",
          type: "video",
          updatedAt: "2026-06-23T10:00:00.000Z",
        },
        {
          createdAt: "2026-06-23T10:00:00.000Z",
          filename: "pending.png",
          id: "image-2",
          mimeType: "image/png",
          originalFilename: "pending.png",
          sizeBytes: 1024,
          status: "pending_upload",
          type: "image",
          updatedAt: "2026-06-23T10:00:00.000Z",
        },
      ],
      isError: false,
      isFetching: false,
    } as ReturnType<typeof useMediaLibrary>);

    render(<CommandCenter screenId="screen-1" />);

    const imageSelect = screen.getByLabelText("image from library");
    const videoSelect = screen.getByLabelText("video from library");

    expect(within(imageSelect).getByText(/image.png/)).toBeInTheDocument();
    expect(
      within(imageSelect).queryByText(/video.mp4/),
    ).not.toBeInTheDocument();
    expect(
      within(imageSelect).queryByText(/pending.png/),
    ).not.toBeInTheDocument();
    expect(within(videoSelect).getByText(/video.mp4/)).toBeInTheDocument();
    expect(
      within(videoSelect).queryByText(/image.png/),
    ).not.toBeInTheDocument();
  });
});

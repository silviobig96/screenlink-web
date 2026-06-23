import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MediaCard, MediaLibrary } from "./media-library";

vi.mock("../hooks/use-media", () => ({
  useDeleteMedia: vi.fn(),
  useMediaLibrary: vi.fn(),
  useUploadMedia: vi.fn(),
}));

const { useDeleteMedia, useMediaLibrary, useUploadMedia } =
  await import("../hooks/use-media");
const useDeleteMediaMock = vi.mocked(useDeleteMedia);
const useMediaLibraryMock = vi.mocked(useMediaLibrary);
const useUploadMediaMock = vi.mocked(useUploadMedia);

const imageAsset = {
  createdAt: "2026-06-23T10:00:00.000Z",
  filename: "Un Avivamiento.png",
  id: "media-1",
  mimeType: "image/png",
  originalFilename: "Un Avivamiento.png",
  previewUrl: "https://signed.example.com/image.png",
  sizeBytes: 1_732_635,
  status: "ready",
  type: "image",
  updatedAt: "2026-06-23T10:00:00.000Z",
} as const;

describe("MediaLibrary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useUploadMediaMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useUploadMedia>);
  });

  it("renders media cards with preview, filename, size, type, date, and status", () => {
    const { container } = render(
      <MediaCard asset={imageAsset} deleting={false} onDelete={vi.fn()} />,
    );

    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      imageAsset.previewUrl,
    );
    expect(screen.getByText("Un Avivamiento.png")).toBeInTheDocument();
    expect(screen.getByText("PNG")).toBeInTheDocument();
    expect(screen.getByText("1.7 MB")).toBeInTheDocument();
    expect(screen.getByText("image")).toBeInTheDocument();
    expect(screen.getByText("ready")).toBeInTheDocument();
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it("keeps a fallback card when previewUrl is missing", () => {
    render(
      <MediaCard
        asset={{ ...imageAsset, previewUrl: undefined }}
        deleting={false}
        onDelete={vi.fn()}
      />,
    );

    expect(document.querySelector("img")).not.toBeInTheDocument();
    expect(screen.getByText("Un Avivamiento.png")).toBeInTheDocument();
  });

  it("removes deleted assets from the rendered library after success", () => {
    let assets = [imageAsset];
    useMediaLibraryMock.mockImplementation(
      () =>
        ({
          data: assets,
          isError: false,
          isPending: false,
        }) as ReturnType<typeof useMediaLibrary>,
    );
    useDeleteMediaMock.mockReturnValue({
      isPending: false,
      mutate: vi.fn((_id, options) => {
        assets = [];
        options?.onSuccess?.(undefined, "media-1", undefined);
      }),
    } as unknown as ReturnType<typeof useDeleteMedia>);

    const view = render(<MediaLibrary />);
    expect(screen.getByText("Un Avivamiento.png")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Delete Un Avivamiento.png"));
    view.rerender(<MediaLibrary />);

    expect(screen.queryByText("Un Avivamiento.png")).not.toBeInTheDocument();
    expect(screen.getByText("No media uploaded yet")).toBeInTheDocument();
  });
});

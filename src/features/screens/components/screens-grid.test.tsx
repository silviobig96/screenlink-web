import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ScreensGrid } from "./screens-grid";

vi.mock("../hooks/use-screens", () => ({
  useScreens: vi.fn(),
}));

const { useScreens } = await import("../hooks/use-screens");
const useScreensMock = vi.mocked(useScreens);

describe("ScreensGrid", () => {
  it("renders offline paired screens", () => {
    useScreensMock.mockReturnValue({
      data: [
        {
          deviceModel: "ADT-3",
          deviceName: "Lobby TV",
          id: "screen-1",
          lastSeenAt: null,
          name: "Lobby",
          platform: "google-tv",
          status: "offline",
        },
      ],
      isError: false,
      isPending: false,
    } as ReturnType<typeof useScreens>);

    render(<ScreensGrid />);

    expect(screen.getByText("Lobby")).toBeInTheDocument();
    expect(screen.getByText("offline")).toBeInTheDocument();
    expect(screen.queryByText("No screens paired yet")).not.toBeInTheDocument();
  });

  it("uses paired wording in the empty state", () => {
    useScreensMock.mockReturnValue({
      data: [],
      isError: false,
      isPending: false,
    } as ReturnType<typeof useScreens>);

    render(<ScreensGrid />);

    expect(screen.getByText("No screens paired yet")).toBeInTheDocument();
  });
});

import { ListVideo } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ComingSoon } from "@/components/feedback/coming-soon";

export const metadata = { title: "Playlists" };
export default function PlaylistsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Scheduled content"
        title="Playlists"
        description="Build sequences that keep your screens fresh."
      />
      <ComingSoon
        icon={ListVideo}
        title="Create once, play everywhere"
        description="Playlist creation and scheduling are planned after the core command workflow. Your connected screens remain fully controllable in the meantime."
      />
    </div>
  );
}

import { PageHeader } from "@/components/layout/page-header";
import { MediaLibrary } from "@/features/media/components/media-library";

export const metadata = { title: "Media" };
export default function MediaPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Content library"
        title="Media"
        description="Upload TV-ready images and videos, manage your library, and reuse assets across screens."
      />
      <MediaLibrary />
    </div>
  );
}

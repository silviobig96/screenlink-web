import { Library } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ComingSoon } from "@/components/feedback/coming-soon";

export const metadata = { title: "Media" };
export default function MediaPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Content library"
        title="Media"
        description="Your reusable images and videos will live here."
      />
      <ComingSoon
        icon={Library}
        title="A media library built for every screen"
        description="Upload management is coming in a future release. Today, you can send public image and video URLs directly from any screen control center."
      />
    </div>
  );
}

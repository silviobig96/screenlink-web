import { PageHeader } from "@/components/layout/page-header";
import { PairingForm } from "@/features/pairing/components/pairing-form";

export const metadata = { title: "Pair a TV" };

export default function PairPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <PageHeader
        eyebrow="Connect a display"
        title="Pair your Google TV"
        description="A secure, one-time connection. Your TV will appear in the dashboard as soon as pairing completes."
      />
      <PairingForm />
    </div>
  );
}

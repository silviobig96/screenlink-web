import { Bell, KeyRound, Settings } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Settings" };
export default function SettingsPage() {
  const items = [
    {
      icon: KeyRound,
      title: "Account security",
      text: "Identity and active sessions are securely managed by Clerk.",
    },
    {
      icon: Bell,
      title: "Notifications",
      text: "Fleet alerts and offline notifications are coming in a future release.",
    },
  ];
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Manage your ScreenLink dashboard preferences."
      />
      <Card className="divide-y divide-white/[.06] p-2">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4 rounded-2xl p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[.05] text-cyan-300">
              <Icon aria-hidden className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold text-white">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
            </div>
          </div>
        ))}
      </Card>
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <Settings aria-hidden className="size-4" /> ScreenLink web MVP settings
      </div>
    </div>
  );
}

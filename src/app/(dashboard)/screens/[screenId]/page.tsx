import { ScreenDetail } from "@/features/screens/components/screen-detail";

export const metadata = { title: "Screen control" };
export default async function ScreenDetailPage({
  params,
}: {
  params: Promise<{ screenId: string }>;
}) {
  const { screenId } = await params;
  return <ScreenDetail screenId={screenId} />;
}

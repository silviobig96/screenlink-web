import { ClerkProvider } from "@clerk/nextjs";
import type { ComponentProps } from "react";

type ClerkAppearance = ComponentProps<typeof ClerkProvider>["appearance"];

export const clerkAppearance: ClerkAppearance = {
  variables: {
    colorPrimary: "#22d3ee",
    colorBackground: "#0b1220",
    colorForeground: "#f8fafc",
    borderRadius: "0.9rem",
  },
  elements: {
    cardBox: "shadow-2xl shadow-black/30",
    card: "border border-white/10",
    formButtonPrimary: "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
    footerActionLink: "text-cyan-300 hover:text-cyan-200",
  },
};

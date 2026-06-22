import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-cyan-400 text-slate-950 shadow-[0_10px_35px_-12px_rgba(34,211,238,.8)] hover:bg-cyan-300",
        secondary:
          "border border-white/10 bg-white/[.06] text-white hover:bg-white/10",
        ghost: "text-slate-300 hover:bg-white/[.06] hover:text-white",
        danger:
          "bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/20 hover:bg-rose-500/25",
      },
      size: { default: "min-h-11", lg: "min-h-12 px-5", icon: "size-11 p-0" },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

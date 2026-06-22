"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  LoaderCircle,
  Radio,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getErrorMessage } from "@/lib/api/api-error";
import {
  pairingCodeSchema,
  type PairingFormValues,
} from "../schemas/pairing.schema";
import { useConfirmPairing } from "../hooks/use-confirm-pairing";

export function PairingForm() {
  const mutation = useConfirmPairing();
  const reduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PairingFormValues>({
    resolver: zodResolver(pairingCodeSchema),
    defaultValues: { code: "" },
  });

  if (mutation.data) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="relative overflow-hidden p-7 text-center sm:p-10">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"
          />
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">
            <Check aria-hidden className="size-9" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-white">
            TV paired successfully
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Your display is connected and ready to receive commands.
          </p>
          <Link
            href={`/screens/${encodeURIComponent(mutation.data.screenId)}`}
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-400 px-5 font-semibold text-slate-950"
          >
            Open control center <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="relative overflow-hidden p-6 sm:p-8">
      <div
        aria-hidden
        className="absolute -top-20 -right-20 size-52 rounded-full bg-cyan-400/[.07] blur-3xl"
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="grid size-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <Radio aria-hidden className="size-6" />
          </div>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck aria-hidden className="size-4" /> Secure pairing
          </span>
        </div>
        <h2 className="mt-7 text-xl font-semibold text-white">
          Enter the code on your TV
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Open ScreenLink on your Google TV and type the six digits shown on
          screen.
        </p>
        <form
          className="mt-7"
          onSubmit={handleSubmit(({ code }) => mutation.mutate(code))}
        >
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <div>
                <label className="sr-only" htmlFor="pairing-code">
                  Six-digit pairing code
                </label>
                <input
                  ref={inputRef}
                  id="pairing-code"
                  className="sr-only"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(
                      event.target.value.replace(/\D/g, "").slice(0, 6),
                    )
                  }
                  autoFocus
                />
                <button
                  type="button"
                  aria-label="Enter pairing code"
                  className="grid w-full grid-cols-6 gap-2 sm:gap-3"
                  onClick={() => inputRef.current?.focus()}
                >
                  {Array.from({ length: 6 }, (_, index) => (
                    <span
                      key={index}
                      className="grid aspect-square place-items-center rounded-xl border border-white/10 bg-slate-950/70 text-xl font-semibold text-white transition focus-within:border-cyan-300 sm:text-2xl"
                    >
                      {field.value[index] ?? (
                        <span className="size-1.5 rounded-full bg-slate-700" />
                      )}
                    </span>
                  ))}
                </button>
              </div>
            )}
          />
          <AnimatePresence>
            {(errors.code || mutation.error) && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-sm text-rose-300"
              >
                {errors.code?.message ?? getErrorMessage(mutation.error)}
              </motion.p>
            )}
          </AnimatePresence>
          <Button
            className="mt-6 w-full"
            size="lg"
            disabled={mutation.isPending}
            type="submit"
          >
            {mutation.isPending ? (
              <>
                <LoaderCircle aria-hidden className="size-4 animate-spin" />{" "}
                Pairing securely
              </>
            ) : (
              <>
                Pair this TV <ArrowRight aria-hidden className="size-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
}

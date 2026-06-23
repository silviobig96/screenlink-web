import { z } from "zod";

const supportedMediaExtensions = new Set([
  "gif",
  "jpeg",
  "jpg",
  "m4v",
  "mov",
  "mp4",
  "png",
  "webm",
  "webp",
]);

export const mediaUrlSchema = z.object({
  url: z
    .url("Enter a valid URL.")
    .refine((value) => {
      const protocol = new URL(value).protocol;
      return protocol === "http:" || protocol === "https:";
    }, "Only http or https URLs are allowed.")
    .refine((value) => {
      const pathname = new URL(value).pathname.toLowerCase();
      const extension = pathname.split(".").pop();
      return Boolean(extension && supportedMediaExtensions.has(extension));
    }, "Use a supported media URL: JPG, PNG, WEBP, GIF, MP4, WEBM, MOV, or M4V."),
});
export type MediaUrlFormValues = z.infer<typeof mediaUrlSchema>;

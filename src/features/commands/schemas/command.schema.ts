import { z } from "zod";

export const mediaUrlSchema = z.object({
  url: z.url("Enter a valid URL.").refine((value) => {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  }, "Only http or https URLs are allowed."),
});
export type MediaUrlFormValues = z.infer<typeof mediaUrlSchema>;

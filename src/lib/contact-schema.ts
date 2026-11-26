import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().trim().max(200),
  message: z.string().trim().min(10).max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; at: number }
  | {
      status: "error";
      /** Fields that failed validation (messages are localized on the client). */
      fields?: ContactField[];
      /** Non-field failure reason. */
      reason?: "notConfigured" | "server";
      values: Partial<ContactInput>;
    };

export function parseContact(formData: FormData) {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  const result = contactSchema.safeParse(raw);
  if (result.success) return { ok: true as const, data: result.data };
  const fields = [...new Set(result.error.issues.map((i) => i.path[0] as ContactField))];
  return { ok: false as const, fields, values: raw };
}

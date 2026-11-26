"use server";

import { Resend } from "resend";
import { parseContact, type ContactState } from "./contact-schema";

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never see this field. Pretend success so bots don't retry.
  if (String(formData.get("company") ?? "").length > 0)
    return { status: "success", at: Date.now() };

  const parsed = parseContact(formData);
  if (!parsed.ok) return { status: "error", fields: parsed.fields, values: parsed.values };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return { status: "error", reason: "notConfigured", values: parsed.data };
  }

  const { name, email, message } = parsed.data;
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `[portfolio] ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
    });
    if (error) throw new Error(error.message);
    return { status: "success", at: Date.now() };
  } catch (err) {
    console.error("contact: failed to send", err);
    return { status: "error", reason: "server", values: parsed.data };
  }
}

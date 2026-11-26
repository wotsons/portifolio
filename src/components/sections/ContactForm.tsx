"use client";

import { useTranslations } from "next-intl";
import { useActionState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { sendContact } from "@/lib/contact-action";
import type { ContactField, ContactState } from "@/lib/contact-schema";
import { useAppEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-lg border border-line bg-raised px-3.5 py-2.5 text-fg placeholder:text-muted transition-colors focus:border-accent focus:outline-none aria-invalid:border-negative";

export function ContactForm({ email }: { email: string }) {
  const t = useTranslations("contact");
  const [state, action, pending] = useActionState(sendContact, initial);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useAppEvent("contact:prefill", ({ message }) => {
    if (messageRef.current) messageRef.current.value = message;
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    messageRef.current?.focus({ preventScroll: true });
  });

  const invalid = (f: ContactField) => state.status === "error" && !!state.fields?.includes(f);
  const value = (f: ContactField) => (state.status === "error" ? state.values[f] : undefined);

  const field = (f: ContactField, el: "input" | "textarea") => {
    const id = `contact-${f}`;
    const errId = `${id}-error`;
    const common = {
      id,
      name: f,
      required: true,
      defaultValue: value(f),
      placeholder: t(`${f}Placeholder`),
      "aria-invalid": invalid(f) || undefined,
      "aria-describedby": invalid(f) ? errId : undefined,
    };
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="mono-label">
          {t(f)}
        </label>
        {el === "input" ? (
          <input
            {...common}
            type={f === "email" ? "email" : "text"}
            autoComplete={f === "email" ? "email" : "name"}
            className={inputClass}
          />
        ) : (
          <textarea {...common} ref={messageRef} rows={6} className={cn(inputClass, "resize-y")} />
        )}
        {invalid(f) && (
          <p id={errId} className="text-xs text-negative">
            {t(`errors.${f}`)}
          </p>
        )}
      </div>
    );
  };

  return (
    <form
      // Remount after a successful send to clear the uncontrolled fields.
      key={state.status === "success" ? state.at : "form"}
      action={action}
      noValidate
      className="flex max-w-[560px] flex-col gap-5"
    >
      <div className="grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
        {field("name", "input")}
        {field("email", "input")}
      </div>
      {field("message", "textarea")}

      {/* Honeypot — hidden from humans and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? t("sending") : t("send")}
        </Button>
        <p role="status" aria-live="polite" className="font-mono text-xs">
          {state.status === "success" && <span className="text-accent">{t("success")}</span>}
          {state.status === "error" && state.reason && (
            <span className="text-negative">{t(`errors.${state.reason}`, { email })}</span>
          )}
        </p>
      </div>
    </form>
  );
}

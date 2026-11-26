"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  title: string;
  help: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}

export function GameModal({ title, help, closeLabel, onClose, children }: Props) {
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialog.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-bg-deep/80 p-4 backdrop-blur-sm print:hidden"
      onClick={onClose}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] rounded-2xl border border-line-strong bg-card p-5 shadow-float outline-none"
      >
        <div className="mb-3 flex items-center">
          <p className="font-mono text-sm text-accent">{title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="ml-auto grid size-7 place-items-center rounded-md text-muted hover:bg-raised hover:text-fg"
          >
            <X className="size-4" />
          </button>
        </div>
        {children}
        <p className="mt-3 font-mono text-[11px] text-muted">{help}</p>
      </div>
    </div>
  );
}

import Image from "next/image";
import type { ReactNode } from "react";
import type { PreviewKind } from "@/content/types";
import { cn } from "@/lib/utils";

// Drawn with theme tokens (not image files) so the illustrations follow the accent theme.

const soft = "bg-[color-mix(in_srgb,var(--accent)_22%,transparent)]";
const bar = "h-1.5 rounded-full bg-line-strong";

function Window({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="absolute inset-x-5 top-5 bottom-0 overflow-hidden rounded-t-lg border border-b-0 border-line-strong bg-card shadow-float transition-transform duration-300 ease-(--ease-out-expo) group-hover:-translate-y-1.5">
      <div className="flex h-5 items-center gap-1 border-b border-line px-2">
        <span className="size-1.5 rounded-full bg-[#ff5f57]" />
        <span className="size-1.5 rounded-full bg-[#febc2e]" />
        <span className="size-1.5 rounded-full bg-[#28c840]" />
      </div>
      <div className={cn("relative h-[calc(100%-20px)] p-2.5", className)}>{children}</div>
    </div>
  );
}

function Chat() {
  return (
    <Window className="flex gap-2.5">
      <div className="flex w-[34%] flex-col gap-1.5 border-r border-line pr-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn("flex items-center gap-1.5 rounded-md p-1", i === 0 && "bg-raised")}
          >
            <span
              className={cn(
                "size-3.5 shrink-0 rounded-full",
                i === 0 ? "bg-accent" : "bg-line-strong",
              )}
            />
            <span className="flex flex-1 flex-col gap-1">
              <span className={cn(bar, "w-4/5")} />
              <span className={cn(bar, "w-1/2 opacity-60")} />
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <span className="h-4 w-3/5 rounded-md rounded-bl-none bg-raised" />
        <span className={cn("h-4 w-1/2 self-end rounded-md rounded-br-none", soft)} />
        <span className="h-4 w-2/3 rounded-md rounded-bl-none bg-raised" />
        <span className={cn("h-4 w-2/5 self-end rounded-md rounded-br-none", soft)} />
        <span className="mt-auto flex h-4 items-center rounded-md border border-line px-1.5">
          <span className={cn(bar, "w-1/3")} />
          <span className="ml-auto size-2 rounded-full bg-accent" />
        </span>
      </div>
    </Window>
  );
}

function Components() {
  return (
    <Window className="grid grid-cols-3 gap-2">
      <div className="grid place-items-center rounded-md border border-line">
        <span className="h-4 w-12 rounded-md bg-accent" />
      </div>
      <div className="grid place-items-center rounded-md border border-line">
        <span className="relative h-3.5 w-7 rounded-full bg-accent">
          <span className="absolute top-0.5 right-0.5 size-2.5 rounded-full bg-bg" />
        </span>
      </div>
      <div className="grid place-items-center rounded-md border border-line">
        <span className="flex h-4 w-14 items-center rounded border border-accent px-1">
          <span className="h-2.5 w-px bg-accent" />
        </span>
      </div>
      <div className="grid place-items-center rounded-md border border-line">
        <span className="flex gap-1">
          <span className="grid size-3 place-items-center rounded-sm bg-accent text-[8px] leading-none text-accent-ink">
            ✓
          </span>
          <span className="size-3 rounded-sm border border-line-strong" />
        </span>
      </div>
      <div className="grid place-items-center rounded-md border border-line">
        <span className="flex gap-1">
          <span className={cn("h-3 w-6 rounded-full", soft)} />
          <span className="h-3 w-4 rounded-full bg-raised" />
        </span>
      </div>
      <div className="grid place-items-center rounded-md border border-line">
        <span className="relative h-1 w-14 rounded-full bg-line-strong">
          <span className="absolute inset-y-0 left-0 w-3/5 rounded-full bg-accent" />
          <span className="absolute top-1/2 left-3/5 size-2.5 -translate-1/2 rounded-full border-2 border-accent bg-card" />
        </span>
      </div>
    </Window>
  );
}

function Performance() {
  const bars = [92, 80, 74, 61, 55, 48];
  return (
    <Window className="flex items-center gap-4 px-4">
      <svg viewBox="0 0 64 64" className="size-[70px] shrink-0 -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r="26" fill="none" strokeWidth="6" className="stroke-raised" />
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${0.94 * 163.4} 163.4`}
          className="stroke-accent"
        />
      </svg>
      <div className="flex h-full flex-1 flex-col">
        <span className="font-mono text-[15px] leading-5 text-accent">-17%</span>
        <span className={cn(bar, "mt-1 w-2/3")} />
        <div className="mt-auto flex h-[52%] items-end gap-1.5">
          {bars.map((h, i) => (
            <span
              key={h}
              className={cn(
                "flex-1 rounded-t-sm",
                i === bars.length - 1 ? "bg-accent" : "bg-raised",
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </Window>
  );
}

function Dashboard() {
  const revenue = [40, 55, 35, 70, 60, 85, 50, 75, 90, 65, 80, 95];
  return (
    <Window className="flex gap-2">
      <div className="flex w-5 flex-col items-center gap-2 border-r border-line pr-1.5">
        <span className="size-2.5 rounded-sm bg-accent" />
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-sm bg-line-strong" />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex flex-col gap-1 rounded-md border border-line p-1.5">
              <span className={cn(bar, "w-1/2 opacity-60")} />
              <span
                className={cn("h-2 w-3/4 rounded-full", i === 0 ? "bg-accent" : "bg-fg-2/50")}
              />
            </span>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1 rounded-md border border-line p-1.5">
          {revenue.map((h, i) => (
            <span
              key={i}
              className={cn(
                "flex-1 rounded-t-[2px]",
                i === revenue.length - 1 ? "bg-accent" : soft,
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </Window>
  );
}

function Player() {
  const wave = [
    30, 60, 45, 80, 55, 95, 70, 40, 65, 85, 50, 75, 35, 60, 90, 45, 70, 55, 40, 65, 30, 50,
  ];
  return (
    <Window className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        <span className="size-12 shrink-0 rounded-md bg-[linear-gradient(135deg,var(--accent),color-mix(in_srgb,var(--accent)_20%,var(--color-raised)))]" />
        <span className="flex flex-1 flex-col gap-1.5">
          <span className="h-2 w-3/4 rounded-full bg-fg-2/60" />
          <span className={cn(bar, "w-1/2")} />
        </span>
        <span className="grid size-7 place-items-center rounded-full bg-accent">
          <span className="ml-0.5 border-y-[5px] border-l-[8px] border-y-transparent border-l-accent-ink" />
        </span>
      </div>
      <div className="flex h-8 items-center gap-[3px]">
        {wave.map((h, i) => (
          <span
            key={i}
            className={cn("flex-1 rounded-full", i < 9 ? "bg-accent" : "bg-line-strong")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </Window>
  );
}

function Terminal() {
  return (
    <Window className="flex flex-col gap-1 font-mono text-[10px] leading-[14px]">
      <span>
        <span className="text-accent">$</span> <span className="text-fg">whoami</span>
      </span>
      <span className="text-fg-2">wotson — full stack developer</span>
      <span>
        <span className="text-accent">$</span> <span className="text-fg">ls projects/</span>
      </span>
      <span className="text-muted">atendimento/ dashboard/ podcastr/</span>
      <span className="caret">
        <span className="text-accent">$</span>
      </span>
    </Window>
  );
}

const ILLUSTRATIONS: Record<PreviewKind, () => ReactNode> = {
  chat: Chat,
  components: Components,
  performance: Performance,
  dashboard: Dashboard,
  player: Player,
  terminal: Terminal,
};

export function ProjectPreview({
  kind,
  image,
  alt,
}: {
  kind: PreviewKind;
  image?: string;
  alt: string;
}) {
  const Illustration = ILLUSTRATIONS[kind];
  return (
    <div
      aria-hidden={image ? undefined : true}
      className="relative h-[150px] shrink-0 overflow-hidden border-b border-line bg-bg-deep bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_70%),radial-gradient(var(--color-line-strong)_1px,transparent_1px)] bg-[size:100%_100%,14px_14px]"
    >
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes="360px"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <Illustration />
      )}
    </div>
  );
}

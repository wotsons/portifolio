import { SECTIONS, type SectionId } from "@/content/sections";
import { pad3 } from "@/lib/utils";

interface Props {
  id: SectionId;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ id, title, subtitle }: Props) {
  const index = SECTIONS.indexOf(id) + 1;
  return (
    <header className="reveal mb-12">
      <h2
        id={`${id}-title`}
        className="flex items-baseline gap-3 text-[clamp(28px,4vw,36px)] leading-[1.15] font-medium tracking-[-0.02em] text-fg"
      >
        <span aria-hidden className="font-mono text-base font-normal tracking-normal text-accent">
          {pad3(index)}
        </span>
        {title}
      </h2>
      {subtitle && <p className="mt-3 max-w-[60ch] text-fg-2">{subtitle}</p>}
    </header>
  );
}

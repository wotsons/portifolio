import { SECTIONS, type SectionId } from "@/content/sections";
import { pad3 } from "@/lib/utils";

interface Props {
  id: SectionId;
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ id, label, title, subtitle }: Props) {
  const index = SECTIONS.indexOf(id) + 1;
  return (
    <header className="mb-12">
      <p className="mono-label mb-3">
        <span className="text-accent">{pad3(index)}</span>
        {label}
      </p>
      <h2
        id={`${id}-title`}
        className="text-[clamp(28px,4vw,36px)] leading-[1.15] font-medium tracking-[-0.02em] text-fg"
      >
        {title}
      </h2>
      {subtitle && <p className="mt-3 max-w-[60ch] text-fg-2">{subtitle}</p>}
    </header>
  );
}

import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

/** Renders an SVG from /public as a mask over `currentColor`, so it inherits text color and hover states. */
function MaskIcon({ src, className }: IconProps & { src: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        maskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
}

export const GithubIcon = ({ className }: IconProps) => (
  <MaskIcon src="/images/github.svg" className={className} />
);

export const LinkedinIcon = ({ className }: IconProps) => (
  <MaskIcon src="/images/linkedin.svg" className={className} />
);

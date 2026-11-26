/** Page sections in display order. Drives the side nav, keyboard shortcuts and `goto`. */
export const SECTIONS = ["home", "work", "profile", "experience", "contact"] as const;

export type SectionId = (typeof SECTIONS)[number];

export function isSectionId(value: string): value is SectionId {
  return (SECTIONS as readonly string[]).includes(value);
}

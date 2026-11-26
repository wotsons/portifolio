import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-padded section index used by the side nav and section labels ("001", "002"...). */
export function pad3(n: number) {
  return String(n).padStart(3, "0");
}

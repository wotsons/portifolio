"use client";

import { Terminal } from "@/components/terminal/Terminal";
import { BootScreen } from "./BootScreen";
import { CustomCursor } from "./CustomCursor";
import { EasterEggs } from "./EasterEggs";
import { MatrixRain } from "./MatrixRain";
import { RevealObserver } from "./RevealObserver";

/** Global, purely client-side layers mounted once per page. */
export function Effects() {
  return (
    <>
      <MatrixRain />
      <RevealObserver />
      <Terminal />
      <EasterEggs />
      <BootScreen />
      <CustomCursor />
    </>
  );
}

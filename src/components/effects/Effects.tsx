"use client";

import { CustomCursor } from "./CustomCursor";
import { MatrixRain } from "./MatrixRain";
import { RevealObserver } from "./RevealObserver";

/** Global, purely client-side layers mounted once per page. */
export function Effects() {
  return (
    <>
      <MatrixRain />
      <RevealObserver />
      <CustomCursor />
    </>
  );
}

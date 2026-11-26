"use client";

import { useFormatter } from "next-intl";
import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** "Now" can't be known while prerendering, so the server renders an absolute date. */
export function RelativeTime({ iso }: { iso: string }) {
  const format = useFormatter();
  const date = new Date(iso);
  const now = useSyncExternalStore(
    noop,
    () => Math.floor(Date.now() / 60_000),
    () => null,
  );

  return (
    <time dateTime={iso} title={format.dateTime(date, { dateStyle: "medium" })}>
      {now === null
        ? format.dateTime(date, { month: "short", day: "numeric" })
        : format.relativeTime(date, new Date(now * 60_000))}
    </time>
  );
}

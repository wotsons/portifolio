"use client";

import { useFormatter } from "next-intl";
import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * "3 days ago" on the client. The server renders a short absolute date, because
 * "now" can't be known while prerendering, and the client swaps it in after hydration.
 */
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

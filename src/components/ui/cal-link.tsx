"use client";

import { useEffect, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { CAL_BOOKING_URL, CAL_LINK, calEmbedReady, ensureCalEmbed } from "@/lib/cal";

/**
 * CalLink — a FlareLink-shaped trigger that opens the Cal.com booking popup.
 * Renders a real anchor to the hosted booking page; once embed.js is live the
 * click is intercepted and Cal's element-click handler (delegated on document,
 * keyed off data-cal-link) opens the themed modal instead. No JS, or the embed
 * blocked/unloaded → the anchor simply opens cal.com in a new tab. Mounting one
 * of these is what pulls the embed script in, so pages without a booking
 * trigger never load it.
 */
export function CalLink({
  quiet = false,
  className = "",
  children,
  ...rest
}: {
  quiet?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  useEffect(() => {
    ensureCalEmbed();
  }, []);

  const cls = `inline-link ${quiet ? "quiet" : ""} ${className}`.trim();

  return (
    <a
      className={cls}
      href={CAL_BOOKING_URL}
      target="_blank"
      rel="noreferrer"
      data-cal-link={CAL_LINK}
      data-cal-namespace=""
      data-cal-config='{"layout":"month_view"}'
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        // the modal takes over only when it actually can; otherwise the href runs
        if (calEmbedReady()) e.preventDefault();
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

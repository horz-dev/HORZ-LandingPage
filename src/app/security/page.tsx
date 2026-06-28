import type { Metadata } from "next";
import { SecurityPage } from "@/components/security/security-page";

/**
 * /security — Security & Trust (content/03). A top-level static route; the footer
 * "Security & Trust" link resolves here. Takes routing precedence over the [slug]
 * function segment (which 404s anything outside the seven layers).
 */
export const metadata: Metadata = {
  title: "Security & Trust",
  description:
    "Every artifact, signed by a human and traced to its source. The human on the signature line, the audit trail, scoped data, named compliance, and continuity without lock-in.",
};

export default function SecurityRoute() {
  return <SecurityPage />;
}

/**
 * TEMPORARY single mailbox. The horz.dev mail provider isn't provisioned yet,
 * so the role addresses (contact@, talk@, security@, support@, media@,
 * careers@horz.dev) would bounce — and a bounced mail is a lost lead. Until
 * the provider lands, every displayed address and every mailto on the site is
 * this one working inbox; each channel tags its mailto subject so triage
 * survives the shared inbox.
 *
 * Swap-back: grep CONTACT_EMAIL / mailtoHref and restore the role addresses
 * (content/08 carries the canonical set).
 */
export const CONTACT_EMAIL = "horz.dev@gmail.com";

/** mailto: href with an optional subject tag for shared-inbox triage */
export function mailtoHref(subject?: string): string {
  return subject
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
    : `mailto:${CONTACT_EMAIL}`;
}

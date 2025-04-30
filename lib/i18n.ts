import landingContent from "@/content/en/landing.json";

/**
 * Simple content loader for the landing page.
 * Currently loads only English content directly.
 *
 * TODO: Implement proper locale handling if needed.
 */
export const getLandingContent = () => {
  // In a real i18n setup, you might load based on a locale parameter
  // e.g., const content = await import(`@/content/${locale}/landing.json`);
  return landingContent;
};

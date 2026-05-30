import { siteSettings } from "./siteSettings";
import { eventSettings } from "./eventSettings";
import { homepage } from "./homepage";
import { aboutPage } from "./aboutPage";
import { stallHolderPage } from "./stallHolderPage";
import { faqItem } from "./faqItem";
import { sponsor } from "./sponsor";
import { contactPage } from "./contactPage";

// policyPages removed — Privacy / Terms / Code of Conduct stay as code,
// edited via PR against .docx files in site-info/docs/. See CMS_PLAN.md §3.

export const schemaTypes = [
  // Singletons
  siteSettings,
  eventSettings,
  homepage,
  aboutPage,
  stallHolderPage,
  contactPage,
  // Collections
  faqItem,
  sponsor,
];

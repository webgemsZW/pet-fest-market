import { siteSettings } from "./siteSettings";
import { event } from "./event";
import { homepage } from "./homepage";
import { aboutPage } from "./aboutPage";
import { stallHolderPage } from "./stallHolderPage";
import { faqItem } from "./faqItem";
import { sponsor } from "./sponsor";
import { contactPage } from "./contactPage";

// policyPages removed — Privacy / Terms / Code of Conduct stay as code,
// edited via PR against .docx files in site-info/docs/. See CMS_PLAN.md §3.
//
// `eventSettings` (singleton) was converted to `event` (collection) so the
// site can host multiple events over time. See CMS_PLAN.md §9.2.

export const schemaTypes = [
  // Singletons
  siteSettings,
  homepage,
  aboutPage,
  stallHolderPage,
  contactPage,
  // Collections
  event,
  faqItem,
  sponsor,
];

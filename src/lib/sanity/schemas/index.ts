import { siteSettings } from "./siteSettings";
import { eventSettings } from "./eventSettings";
import { homepage } from "./homepage";
import { aboutPage } from "./aboutPage";
import { stallHolderPage } from "./stallHolderPage";
import { faqItem } from "./faqItem";
import { sponsor } from "./sponsor";
import { contactPage } from "./contactPage";
import { policyPages } from "./policyPages";

export const schemaTypes = [
  // Singletons
  siteSettings,
  eventSettings,
  homepage,
  aboutPage,
  stallHolderPage,
  contactPage,
  policyPages,
  // Collections
  faqItem,
  sponsor,
];

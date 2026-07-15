import type { Metadata } from "next";

/**
 * The optional per-page SEO override edited in Studio (see
 * `_seo-fields.ts`). Both fields are optional — a blank field falls back
 * to the page's built-in default.
 */
export interface SeoFields {
  metaTitle?: string | null;
  metaDescription?: string | null;
}

/**
 * Build a page's `Metadata` from its Studio SEO override, falling back to
 * the built-in defaults when the fields are blank. Keeps title/description
 * in sync across the tab title, Open Graph, and Twitter cards.
 *
 * The root layout's title template ("%s | PetFest Market") is applied to
 * the returned `title`, so pass the bare page title (e.g. "About").
 */
export function pageMetadata(opts: {
  seo?: SeoFields | null;
  fallbackTitle: string;
  fallbackDescription: string;
}): Metadata {
  const title = opts.seo?.metaTitle?.trim() || opts.fallbackTitle;
  const description = opts.seo?.metaDescription?.trim() || opts.fallbackDescription;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
  };
}

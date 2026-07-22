import { defineField } from "sanity";

/**
 * Shared SEO override field, added to each editable page document so the
 * client can control the browser-tab title and the search / social-share
 * description per page. Both sub-fields are optional — when blank the page
 * falls back to its built-in default (see each page's generateMetadata).
 *
 * Kept in one place (like `_icon-field.ts`) so every page exposes the same
 * SEO controls and we only maintain the field definition once.
 */
export function seoField(group?: string) {
  return defineField({
    name: "seo",
    title: "SEO / Social Share",
    type: "object",
    ...(group ? { group } : {}),
    description:
      "Optional. Overrides the search-engine and social-share metadata for this page. Leave blank to use the sensible built-in default.",
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({
        name: "metaTitle",
        title: "Meta Title",
        type: "string",
        description:
          "Browser-tab title and search-result headline. Aim for ~60 characters. The site name is appended automatically.",
      }),
      defineField({
        name: "metaDescription",
        title: "Meta Description",
        type: "text",
        rows: 2,
        description: "Search-result and social-share summary. Aim for ~155 characters.",
      }),
    ],
  });
}

import { revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

/**
 * Webhook target hit by Sanity whenever an editor publishes a change.
 *
 * Sanity → POST /api/revalidate
 *   body: JSON projection from the webhook (we configure it to return
 *         `{ _id, _type }`)
 *   header: `sanity-webhook-signature` for HMAC verification
 *
 * On a valid request we call `revalidateTag()` for the document's id and
 * type tags. Any page that did
 *     fetch(..., { next: { tags: ["sanity:<that-id>"] } })
 * will re-fetch on its next visit.
 *
 * Configure on the Sanity side under Project → API → Webhooks:
 *   URL:        https://<env-host>/api/revalidate
 *   Trigger on: create, update, delete
 *   Filter:     _type in [ ...editable types ]
 *   Projection: { _id, _type }
 *   Secret:     same value as SANITY_REVALIDATE_SECRET
 *
 * Per CMS_PLAN.md §6.1, the secret differs between dev and prod
 * environments (separate Sanity projects, separate webhooks).
 */
export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { error: "SANITY_REVALIDATE_SECRET not configured" },
      { status: 500 },
    );
  }

  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    return Response.json({ error: "Missing signature header" }, { status: 401 });
  }

  const body = await req.text();
  const valid = await isValidSignature(body, signature, secret);
  if (!valid) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: { _id?: string; _type?: string };
  try {
    payload = JSON.parse(body);
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { _id, _type } = payload;
  if (!_id || !_type) {
    return Response.json(
      { error: "Webhook body missing _id or _type" },
      { status: 400 },
    );
  }

  // Tag for the specific document (e.g. "sanity:siteSettings")
  // and one for the type (e.g. "sanity:type:faqItem") so collection
  // listings can be invalidated by any item changing.
  //
  // Next 16's `revalidateTag(tag, profile)` takes a cache profile as the
  // second arg; "max" invalidates all cached entries for the tag
  // regardless of the cacheLife profile they were stored under.
  revalidateTag(`sanity:${_id}`, "max");
  revalidateTag(`sanity:type:${_type}`, "max");

  return Response.json({ revalidated: true, id: _id, type: _type });
}

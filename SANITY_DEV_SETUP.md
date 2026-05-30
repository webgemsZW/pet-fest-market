# Sanity DEV Account — Setup Checklist (Charles)

Step-by-step to wire your personal Sanity dev account to the local + Vercel
preview environments. Companion to `CMS_PLAN.md` §5 and §6.

After this, the Acknowledgement of Country in the footer will be editable
via your dev Studio at `http://localhost:3000/studio` and changes will
propagate to the live preview URL within seconds.

**Andrea will do an equivalent run-through for the prod project once her
account exists. Same steps, different secrets, different scope.**

---

## 1. Create the Sanity project

From the repo root:

```bash
npx sanity@latest init --env=.env.local
```

Prompts to answer:

| Prompt | Answer |
|---|---|
| Login | Use the same Google account you'll use for Sanity |
| Project | **Create new project** |
| Project name | `PetFest Market — Dev` |
| Dataset | Use `production` (yes, even though this is the dev project — see CMS_PLAN.md §6.1 for why) |
| Visibility | Public is fine; published content is public anyway |
| Output path | Just hit enter — we're not creating a new app, we already have one |
| Embed studio in repo | **No** (we already have it at `src/app/studio/`) |

This writes `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
to `.env.local`. Open it and confirm both are populated.

You'll be told the project ID; jot it down (you'll need it for Vercel).

## 2. Add CORS origins

In the Sanity browser dashboard for the new project:

**API → CORS Origins → Add CORS origin**

Add each of these with **"Allow credentials" enabled**:

- `http://localhost:3000`
- Your Vercel preview pattern, e.g. `https://*-charles-the-developer.vercel.app`
  (or whatever Vercel uses for your account — copy from a recent preview deploy URL)

## 3. Generate a read token

**API → Tokens → Add API token**

- Name: `next-sanity production read`
- Permissions: **Viewer** (read-only is fine for the public site)

Copy the token immediately — you won't be able to see it again. Paste it
into `.env.local`:

```
SANITY_API_READ_TOKEN=<the token>
```

## 4. Generate the webhook secret

Generate a random 32-char string. Easy one-liner:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
```

Add to `.env.local`:

```
SANITY_REVALIDATE_SECRET=<random string>
```

## 5. Configure the publish webhook

**API → Webhooks → Create webhook**

| Field | Value |
|---|---|
| Name | `Vercel revalidate (dev)` |
| URL | For local: webhook can't reach `localhost`. Either skip locally and only configure on the Vercel preview URL (recommended), or use ngrok. For Vercel preview: `https://<your-preview-url>.vercel.app/api/revalidate` |
| Dataset | `production` |
| Trigger on | ☑ Create  ☑ Update  ☑ Delete |
| Filter | `_type in ['siteSettings','eventSettings','homepage','aboutPage','stallHolderPage','contactPage','faqItem','sponsor']` |
| Projection | `{ _id, _type }` |
| HTTP method | `POST` |
| HTTP Headers | (none — auth uses the signature header automatically) |
| Secret | Paste the same string from step 4 |
| API version | `v2024-01-01` |

> **Local testing tip:** webhook can't reach `localhost:3000`. For local dev
> you can either skip the webhook (changes won't auto-revalidate, but the
> next fetch after the cache expires will pick them up), or run `ngrok http
> 3000` and use the ngrok URL as the webhook target.

## 6. Add env vars to Vercel

In the Vercel dashboard for the PetFest Market project: **Settings →
Environment Variables**. Add each of the following, scoped to **Preview**
and **Development** only (not Production — that's Andrea's project, coming
later):

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | (the project ID from step 1) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_READ_TOKEN` | (the token from step 3) |
| `SANITY_REVALIDATE_SECRET` | (the secret from step 4) |

## 7. Local sanity-check

```bash
npm run dev
```

- Visit `http://localhost:3000/studio` — should load Studio and prompt you
  to log in with Google.
- After signing in, you should see the Desk with "Site Settings",
  "Event Settings", "Homepage", "About Page", "Stall Holder Page",
  "Contact Page", and the "FAQ Items" / "Sponsors" collections — and **no**
  "Policy Pages" entry (we deleted it).

## 8. Seed the Acknowledgement of Country document

In Studio → **Site Settings** (click to open the singleton):

- Paste the verbatim acknowledgement from
  `site-info/docs/Acknowledgement of country - Website Petfest.docx`:

  > We acknowledge the Traditional Owners and Custodians of Country throughout Australia and recognise their continuing connection to lands, waters and communities. We pay our respect to their Elders past, present and emerging and extend that respect to all Aboriginal and Torres Strait Islander peoples.

- Click **Publish**.

## 9. Verify end-to-end

- Open `http://localhost:3000` in another tab. Scroll to the footer. You
  should see the acknowledgement (it might be the hardcoded fallback if
  you haven't restarted dev since adding env vars — restart `npm run dev`
  if so).
- In Studio, edit the acknowledgement (e.g. change a word). **Publish**.
- Locally, the fetch cache may need to expire — easiest test is on the
  Vercel preview, since the webhook + revalidate work there:
  - Push a branch, get a preview URL.
  - Confirm the webhook in Sanity is pointing at that preview URL's
    `/api/revalidate`.
  - Edit + publish in Studio.
  - Within ~3 seconds, refresh the preview URL — the footer should show
    the new text.

## 10. Confirm the failure modes

These should all be true:

- Unset `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local` → site still
  renders, footer shows the hardcoded fallback. (`isSanityConfigured()`
  returns false.)
- Invalid signature on the webhook → `/api/revalidate` returns 401, no
  cache invalidation occurs. (Test with a curl call using a bad header.)
- No `siteSettings` document published → footer shows fallback.

---

## What happens next (after this checklist)

You're done with the Phase 1 vertical slice. Next, we wait on:

1. **Andrea** to create the prod Sanity project and invite you + Carolyn.
2. Once that exists, you'll repeat steps 2–7 against the prod project (with
   the Vercel env vars scoped to **Production** this time).
3. Then we move to Phase 2 (rest of `siteSettings`, the `event` collection,
   and `siteSettings.currentEvent`).

If you hit any snag in the steps above, paste the error here and we'll
debug.

import pkg from "../../package.json";

/**
 * App version shown in the footer, so you can tell which build a given
 * environment is running.
 *
 * - `APP_VERSION` — semantic version from package.json. Bump it on a release
 *   with `npm version patch|minor|major` (that edits package.json, which this
 *   reads). It's the human-readable label.
 * - `GIT_SHA` — short commit of the deployed build. Vercel injects the full
 *   SHA at build time; locally it's "local". This is the exact identifier.
 */
export const APP_VERSION = pkg.version;

export const GIT_SHA = (process.env.VERCEL_GIT_COMMIT_SHA ?? "").slice(0, 7) || "local";

/** e.g. "v0.1.0 · 1ca2889" */
export const VERSION_LABEL = `v${APP_VERSION} · ${GIT_SHA}`;

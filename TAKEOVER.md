# TAKEOVER

**State 20.10.2026:** v1 live at https://speechifykeys.pages.dev, all five keys tested in Chrome with real key presses on
the demo page (Speechify 14.12, sound on BlackHole): Space played and paused without scrolling, → moved forward a
sentence twice, ← moved back one, Escape turned Speechify off for the session.

**History:** asked first as a Swift helper with global hotkeys; Marko then proposed a script inside his own pages,
which needs no permissions and is active only where Speechify is open. On the same day he made it a default for
every page he builds.

**Deploy:** `npx wrangler@3 pages deploy public --project-name speechifykeys --branch main`, with the Cloudflare
token and account from his key file in the environment, never printed.

**Next:** the line goes into each of his pages as they are touched; Elevate Media was being edited by another
session on 20.10.2026 and does not carry it yet.

# Speechify Keys

Keyboard control for the Speechify Chrome extension on Marko's own web pages. One line in a page:

```html
<script src="https://speechifykeys.pages.dev/speechify-keys.js" defer></script>
```

| Key | What it does |
|---|---|
| Space | play / pause |
| ← / → | one sentence back / forward (Speechify's page player has no 10-second skip) |
| Escape | turn Speechify off for this session |

It does nothing until Speechify's player is on the page, and never takes a key while typing or with a
modifier held. The script is `public/speechify-keys.js`; `public/index.html` is the demo and test page at
https://speechifykeys.pages.dev. Every page built for Marko carries the line (MANTRA_MANIFEST modules/speechify-keys.md).

/* Speechify Keys v1 (20.10.2026): keyboard control of the Speechify Chrome extension on Marko's own pages.
 *
 *   Space    play / pause
 *   ← / →    skip one sentence back / forward (Speechify's page player has no 10-second skip)
 *   Escape   turn Speechify off on this page
 *
 * Load it with one line, anywhere in the page:
 *   <script src="https://speechifykeys.pages.dev/speechify-keys.js" defer></script>
 *
 * It does nothing until Speechify's side player is on the page, and never takes a key while you type
 * in a field or hold a modifier, so Space still scrolls and types everywhere else.
 */
(function () {
  if (window.__speechifyKeys) return;
  window.__speechifyKeys = 1;

  // Speechify draws its player inside an open shadow root; these are its own data-testid names.
  const BUTTONS = {
    play: '[data-testid="Speechify play button"]',
    pause: '[data-testid="Speechify pause button"]',
    back: '[data-testid="Skip the sentence backward"]',
    forward: '[data-testid="Skip the sentence forward"]',
    off: '[data-testid="Pill player Turn Off Speechify button"]',
  };
  const KEYS = { " ": ["pause", "play"], ArrowLeft: ["back"], ArrowRight: ["forward"], Escape: ["off"] };

  function player() {
    const root = document.getElementById("speechify-side-player")?.shadowRoot;
    const box = root?.querySelector('[data-testid="Speechify Side Player"]');
    return box && box.getBoundingClientRect().width > 0 ? root : null;
  }

  function find(root, names) {
    for (const n of names) {
      const b = root.querySelector(BUTTONS[n]);
      if (b && !b.disabled) return b;
    }
    return null;
  }

  // While it plays, the player shows its skip and off buttons only under the mouse, so the mouse is played to it.
  function mouse(root, type) {
    const at = find(root, ["pause", "play"]) || root.querySelector('[data-testid="Speechify Side Player"]');
    const r = at.getBoundingClientRect();
    const o = { bubbles: true, composed: true, cancelable: true, view: window, relatedTarget: document.body,
                clientX: r.x + r.width / 2, clientY: r.y + r.height / 2 };
    at.dispatchEvent(new PointerEvent("pointer" + type, { ...o, pointerType: "mouse" }));
    at.dispatchEvent(new MouseEvent("mouse" + type, o));
    if (type === "over") {
      at.dispatchEvent(new PointerEvent("pointermove", { ...o, pointerType: "mouse" }));
      at.dispatchEvent(new MouseEvent("mousemove", o));
    }
  }

  async function press(root, names) {
    let b = find(root, names);
    let hovered = false;
    if (!b) {
      mouse(root, "over");
      hovered = true;
      for (let i = 0; i < 15 && !b; i++) {
        await new Promise((ok) => setTimeout(ok, 40));
        b = find(root, names);
      }
    }
    if (b) b.click();
    if (b && names[0] === "off") await confirmOff(root);
    if (hovered && player()) mouse(root, "out");
  }

  // Turning off asks "for this session / from now on / no"; Escape answers the mildest yes.
  async function confirmOff(root) {
    for (let i = 0; i < 25; i++) {
      await new Promise((ok) => setTimeout(ok, 40));
      const yes = [...root.querySelectorAll("button")].find((x) => /for this session/i.test(x.innerText));
      if (yes) return yes.click();
    }
  }

  function typing(e) {
    const t = e.composedPath ? e.composedPath()[0] : e.target;
    if (!(t instanceof Element)) return false;
    return t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);
  }

  window.addEventListener(
    "keydown",
    (e) => {
      const names = KEYS[e.key];
      if (!names || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || typing(e)) return;
      const root = player();
      if (!root) return;
      e.preventDefault();
      e.stopPropagation();
      if (!e.repeat) press(root, names);
    },
    true
  );
})();

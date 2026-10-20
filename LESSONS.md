# LESSONS

- Speechify's player is in `#speechify-side-player`, an open shadow root; its buttons have stable `data-testid`s.
- While playing, the skip and off buttons exist only under the mouse. `mouseenter` does nothing; a bubbling, composed
  `pointerover` + `mouseover` with `relatedTarget` outside, onto the pause button, makes them appear.
- The off button opens a three-way question with no test IDs; match "for this session" by text.
- The extension's own shortcuts (manifest `commands`): Option+A play/pause, Option+L save, Option+S voice typing,
  Ctrl+Cmd+R screenshot mode. No skip.
- No player on a very short page; the demo page has a dozen paragraphs for that reason.
- Test Escape only on the demo page: it turns Speechify off for the whole site until Chrome restarts.
- Test audio goes to BlackHole (`SwitchAudioSource -t output -s "BlackHole 2ch"`); the ADAM's name ends in two spaces.
- Speechify reads a selection: select from the clicked sentence to the end of the page, press play, and it starts there;
  while it reads, pause, select, play again jumps. Programmatic selection is enough, no mouseup needed.
- A click alone does not move Speechify, and its "Paragraph Play" (hover a paragraph, click its icon) needs the mouse to
  stay on the paragraph; it showed nothing to a synthetic hover on 20.10.2026.
- Speechify's settings open in Chrome's side panel, outside the page: page scripts and the extension's tab tools can't reach them.
- Bold or a link splits a sentence into text nodes: look for the sentence start back across the whole block, not one node.

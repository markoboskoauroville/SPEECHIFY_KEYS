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

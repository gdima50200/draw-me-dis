# Draw Me Dis!

A tiny doodle idea generator that gives you a cute drawing prompt and walks you through it one step at a time. No art skills needed — just grab a pen.

---

## Features

- **Curated doodle prompts** — 8 hand-picked ideas (sleepy cloud, shy cactus, happy snail, and more), each with a title, description, and tailored steps
- **Step-by-step guidance** — one instruction at a time so it never feels overwhelming
- **Progress bar** — a thin bar at the top of the note tracks how far along you are
- **Starry night background** — soft dark sky with gently twinkling stars
- **Smooth animations** — the note crumples away and pops back in with slight randomness each time

---

## How to run

1. Open **index.html** in any web browser (Chrome, Firefox, Safari, Edge)
2. That's it — no install, no setup

---

## File structure

```
draw-me-dis/
├── index.html   — page structure
├── styles.css   — all visual styling
├── script.js    — all logic and doodle data
└── README.md    — this file
```

---

## Where to edit things

| What you want to change | Where to look |
|-------------------------|---------------|
| Doodle titles and descriptions | `script.js` → `doodles` array, `title` and `desc` fields |
| Step instructions | `script.js` → `doodles` array, `steps` arrays |
| Add a new doodle | `script.js` → add a new object to the `doodles` array |
| Colors, fonts, sizes | `styles.css` → look for `:root { ... }` near the top |
| Page layout / structure | `index.html` |

---

## Editing tips

- **To add a new doodle**: find the `doodles` array in `script.js` and add a new object with a `title`, `desc`, and `steps` array. Follow the same pattern as the existing ones.
- **To change a color**: open `styles.css` and look near the top for `:root { ... }` — the main colors are listed there with names like `--accent` or `--text-dark`.
- **Save and refresh** the browser tab to see your changes — no build step needed.

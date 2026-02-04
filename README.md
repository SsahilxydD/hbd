# Birthday Atelier

A private, emotionally sophisticated birthday experience built with Next.js 14, React, TypeScript, and Framer Motion.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### 1. Edit the copy

All text is in **`src/data/copy.ts`**:

- `name` — her name
- `hook`, `identity`, `reveal`, etc. — all chapter text
- `memories.items` — photo labels + notes
- `envelopes.items` — "open when…" messages
- `gift.hint` — the gift reveal hint

### 2. Add audio files

Place these in the **`public/`** folder:

- `music.mp3` — soft background music
- `voice.mp3` — your voice/video message for the emotional peak

### 3. Add photos

Replace the placeholder labels in `copy.memories.items` with actual images:

1. Add images to `public/` (e.g., `photo1.jpg`, `photo2.jpg`)
2. Update `Fragments.tsx` to render `<img>` instead of label text

## Project Structure

```
src/
├── app/
│   ├── globals.css    # Global styles + CSS variables
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Main experience (scene orchestration)
├── components/        # All UI components
│   ├── Button.tsx     # Animated button
│   ├── Line.tsx       # Animated text line
│   ├── Scene.tsx      # Scene wrapper with transitions
│   ├── Fragments.tsx  # Floating memory fragments
│   ├── Envelopes.tsx  # "Open when…" cards
│   ├── Waveform.tsx   # Audio visualizer
│   └── ...
└── data/
    └── copy.ts        # All editable text
```

## Deploy

```bash
npm run build
npm run start
```

Or deploy to Vercel with one click.

---

Made only for you. Always.

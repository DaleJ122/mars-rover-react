# Mars Rover React

Tiny single-page app that lets you drive a virtual Mars rover around a fixed 100 × 100 grid.

![image](https://github.com/user-attachments/assets/321b9e0d-a509-4a79-ab7a-0a02c198d373)


---

## Features
- Queue up to **5 commands** (`1-999m`, `Left`, `Right`) and run them in one go
- **Fixed 100 × 100 playfield** – the rover stops at the perimeter and flags it
- Trail is drawn on a 6 px grid for a retro “bitmap” feel
- Previous command batches are listed for quick reference
- Built with **React 18**, **TypeScript**, **Vite** and **Bootstrap 5**

---

## Quick start

```bash
# 1. install deps
npm i

# 2. start dev server
npm run dev

# 3. build for production
npm run build      # output in /dist
npm run preview    # serve the build locally

# Riverboat Game

A simple 3D web game built with Three.js, Vite, and Blender.

## Project Structure

- `blender/`: Blender files.
  - `assets/`: Models (.blend).
  - `chunks/`: Terrain chunks (.blend).
  - `materials/`: Materials (.blend).
  - `scripts/`: Python scripts (`export_chunks.py`).
- `src/`: JavaScript code.
  - `shaders/`: GLSL shaders (.vert, .frag).
  - `systems/`: Game logic (e.g., `ChunkManager.js`, `Water.js`).
  - `utils/`: Utilities (e.g., `disposers.js`).
  - `components/`: Reusable components (`BoatController.js`).
  - `main.js`: Entry point.
  - `style.css`: Stylesheet.
- `assets/`: Source *and* exported assets.
  - `models/`: Exported glTF.
    - `chunks/`: glTF/glb terrain chunks.
    - `characters/`: glTF models (boat, coin).
  - `textures/`: *Source* textures.
     - `water/`
     - `environment/`
     - `characters/`
- `index.html`: Main HTML.
- `package.json`: npm configuration.
- `package-lock.json`: npm lockfile.
- `vite.config.js`: Vite configuration.

## Getting Started

1.  **Install:** `npm install`
2.  **Dev Server:** `npm run dev` (usually at `http://localhost:5173`).
3.  **Build:** `npm run build` (output in `dist/`).
4.  **Deploy:** Copy `dist/` to your server.

## Blender Workflow

1.  **Assets:** Create in `blender/assets/`.
2.  **Chunks:** Create in `blender/chunks/` (name: `biome_x_z.blend`).
3.  **Gradients:** Set up in `blender/materials/gradient_materials.blend`.
4.  **Export:** Use `blender/scripts/export_chunks.py` (needs `gltf-transform`). Exports `.glb` to `assets/models/chunks/` and `.basis` textures.
5.  **Textures:** Originals in `assets/textures/`.

## Three.js Development

-   Edit JavaScript in `src/`.
-   Vites HMR applies changes.
-   Edit `chunkGrid` in `main.js` for level layout.
-   New chunks load dynamically (no server restart needed *unless* `chunkGrid` changes).


# dosepehr.github.io

Landing page and documentation for [Frontend Foundation](https://github.com/dosepehr/frontend-foundation),
live at **https://dosepehr.github.io/**.

Built with Next.js (static export) and [Fumadocs](https://fumadocs.dev). The component pages render the real
components and their Storybook stories, so the docs always match the library.

## How it works

1. `npm run foundation:sync` copies the library's `src/` (and fonts) into `./foundation`, from `$FOUNDATION_DIR`,
   a sibling `../frontend-foundation` checkout, or a shallow clone of GitHub `main`, in that order. The copy is
   incremental: only changed files are written, so the dev server sees normal file edits.
2. `npm run generate` reads every component folder in `foundation/src/components/{ui,controlled}` and writes:
    - `content/docs/{components,form}/<slug>.mdx` — the page (install, usage, examples, API reference)
    - `src/generated/components/<slug>.tsx` — client module binding the stories to the playground
    - `src/generated/data/<slug>.json` — stories, their source code and props (react-docgen-typescript)
    - `src/generated/theme-defaults.json` — the default token colors for the Themes page
3. `next build` exports the site to `./out`.

`npm run dev` and `prebuild` run steps 1 and 2 for you, and everything they produce is gitignored. While
`npm run dev` runs, it watches a local `frontend-foundation` checkout: edit a component or a story there and the
docs re-sync, regenerate and hot-reload, with no restart.

| Command             | What it does                                                                         |
| ------------------- | ------------------------------------------------------------------------------------ |
| `npm run dev`       | Sync, generate, start the dev server on http://localhost:4000, and watch the library |
| `npm run build`     | Sync, generate, and export the static site to `./out`                                |
| `npm run typecheck` | Type-check the site's own code                                                       |

Each component page's title, intro and usage notes live in `content/components/<slug>.md` (front matter +
Markdown body); the playground and examples come from the component's stories in frontend-foundation.

## Structure

```
src/
  app/          routes only (home, themes, docs, search index)
  features/     component-docs (playground, examples, props), home, themes
  core/         site config, Fumadocs source, providers, theme model
  shared/       showcase cards, CodeBlock, hooks
  store/        useThemeStore (site-wide custom theme)
content/docs/   guide pages; component pages are generated
scripts/        sync-foundation.mjs, generate/
```

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`, daily (to pick up
library changes), and on demand. In the repo settings, set **Pages → Source** to **GitHub Actions**.

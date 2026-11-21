// Fumadocs' search dialog marks matches with the CSS Custom Highlight API and
// styles them with `[&_::highlight(fd-search)]:…` utilities. Turbopack's CSS
// parser doesn't know `::highlight()` yet and warns on every compile, so
// global.css stops Tailwind from generating those utilities and this rule is
// inlined into <head> instead, where no bundler parses it.
export const searchHighlightStyle =
    '::highlight(fd-search){color:var(--color-fd-primary);text-decoration-line:underline}';

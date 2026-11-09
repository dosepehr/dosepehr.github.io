import { loader } from 'fumadocs-core/source';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { applyMdxPreset } from 'fumadocs-mdx/config';
import { defineDocs } from 'fumadocs-mdx/macro';
import { remarkCodeMeta } from './mdx/remarkCodeMeta';
import { docsRoute } from './site';

const docs = defineDocs({
    dir: 'content/docs',
    docs: {
        schema: pageSchema,
        // Code fences are highlighted by the library's CodeBlock (see
        // mdx/MdxPre), so Fumadocs' own highlighter is turned off.
        mdxOptions: applyMdxPreset({
            rehypeCodeOptions: false,
            remarkPlugins: (plugins) => [...plugins, remarkCodeMeta],
        }),
    },
    meta: { schema: metaSchema },
});

export const source = loader({
    baseUrl: docsRoute,
    source: docs.toFumadocsSource(),
});

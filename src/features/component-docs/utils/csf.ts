import type {
    ArgTypes,
    ComponentDocsData,
    CsfMeta,
    CsfStory,
    ResolvedStory,
    StoriesModule,
} from '../types';
import { composeStory } from './composeStory';

// Merges each generated story entry with its live CSF export and composes
// its component (outside render, so each story keeps a stable component).
export function resolveStories(
    data: ComponentDocsData,
    modules: StoriesModule[],
): Map<string, ResolvedStory> {
    const resolved = new Map<string, ResolvedStory>();
    for (const [index, file] of data.storyFiles.entries()) {
        const mod = modules[index];
        if (!mod) continue;
        const meta = (mod.default ?? {}) as CsfMeta;
        for (const info of file.stories) {
            const story = (mod[info.exportName] ?? {}) as CsfStory;
            const argTypes: ArgTypes = { ...meta.argTypes, ...story.argTypes };
            resolved.set(info.id, {
                info,
                meta,
                story,
                componentName: file.componentName ?? data.componentName,
                args: { ...meta.args, ...story.args },
                argTypes,
                layout:
                    story.parameters?.layout ??
                    meta.parameters?.layout ??
                    'centered',
                Component: composeStory(meta, story, argTypes),
            });
        }
    }
    return resolved;
}

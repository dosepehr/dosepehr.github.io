import type { ComponentType, ReactNode } from 'react';

// ---- Generated data (see scripts/generate) ----

export interface StoryInfo {
    id: string;
    exportName: string;
    title: string;
    source: string | null;
    hasArgs: boolean;
}

export interface PropRow {
    name: string;
    type: string;
    required: boolean;
    default?: string;
    description?: string;
}

export interface PropsDoc {
    name: string;
    description?: string;
    props: PropRow[];
}

export interface ComponentDocsData {
    slug: string;
    title: string;
    componentName: string;
    storyFiles: { componentName: string | null; stories: StoryInfo[] }[];
    playgroundStory: string | null;
    props: { main: PropsDoc | null; parts: PropsDoc[] };
}

// ---- The subset of Storybook CSF the docs understand ----

export type Args = Record<string, unknown>;

export interface StoryContext {
    args: Args;
    argTypes: ArgTypes;
    parameters: Record<string, unknown>;
}

export type Decorator = (
    Story: ComponentType,
    context: StoryContext,
) => ReactNode;

export interface ArgType {
    control?:
        | string
        | false
        | { type: string; min?: number; max?: number; step?: number };
    options?: readonly unknown[];
    description?: string;
}

export type ArgTypes = Record<string, ArgType>;

export interface CsfMeta {
    component?: ComponentType<Args>;
    args?: Args;
    argTypes?: ArgTypes;
    decorators?: Decorator[];
    parameters?: { layout?: 'centered' | 'padded' | 'fullscreen' } & Record<
        string,
        unknown
    >;
}

export interface CsfStory {
    args?: Args;
    argTypes?: ArgTypes;
    decorators?: Decorator[];
    parameters?: CsfMeta['parameters'];
    render?: (args: Args, context: StoryContext) => ReactNode;
}

export type StoriesModule = { default: unknown } & Record<string, unknown>;

/** A story with everything needed to render it, merged from meta + story. */
export interface ResolvedStory {
    info: StoryInfo;
    meta: CsfMeta;
    story: CsfStory;
    componentName: string;
    args: Args;
    argTypes: ArgTypes;
    layout: 'centered' | 'padded' | 'fullscreen';
    /** The story wrapped in its decorators, composed once per story. */
    Component: ComponentType;
}

// ---- Controls ----

export type Control =
    | { kind: 'select'; options: string[] }
    | { kind: 'boolean' }
    | { kind: 'text' }
    | { kind: 'number'; min?: number; max?: number; step?: number }
    | { kind: 'color' };

export interface ControlSpec {
    name: string;
    control: Control;
    description?: string;
}

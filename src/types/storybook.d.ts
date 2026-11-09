// Types for the Storybook CSF imports in frontend-foundation's stories.
// Storybook itself isn't installed here (the docs only render stories), so
// this mirrors the parts of `Meta` / `StoryObj` the stories use.

declare module '@storybook/nextjs-vite' {
    import type {
        ComponentProps,
        ComponentType,
        JSXElementConstructor,
        ReactNode,
    } from 'react';

    type AnyComponent = JSXElementConstructor<never>;
    type PropsOf<T> = T extends AnyComponent
        ? ComponentProps<T>
        : T extends { component?: infer C }
          ? C extends AnyComponent
              ? ComponentProps<C>
              : Record<string, unknown>
          : Record<string, unknown>;

    interface StoryContext<P> {
        args: P;
        argTypes: Record<string, unknown>;
        parameters: Record<string, unknown>;
    }

    type Decorator<P> = (
        Story: ComponentType,
        context: StoryContext<P>,
    ) => ReactNode;

    interface Annotations<P> {
        name?: string;
        tags?: string[];
        args?: Partial<P> & Record<string, unknown>;
        argTypes?: Record<string, unknown>;
        decorators?: Decorator<P>[];
        parameters?: Record<string, unknown>;
        render?: (args: P, context: StoryContext<P>) => ReactNode;
        play?: (context: unknown) => unknown;
    }

    export type Meta<T = unknown> = Annotations<PropsOf<T>> & {
        title?: string;
        component?: AnyComponent | ComponentType<never>;
        subcomponents?: Record<string, AnyComponent>;
    };

    export type StoryObj<T = unknown> = Annotations<PropsOf<T>>;
}

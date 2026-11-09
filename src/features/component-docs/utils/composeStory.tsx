import { type ComponentType, useContext } from 'react';
import type { ArgTypes, CsfMeta, CsfStory, StoryContext } from '../types';
import { ArgsContext } from './argsContext';

// Turns a story into one stable component: the story itself (render function
// or the meta component) wrapped in its decorators, story-level innermost,
// like Storybook. Args come from ArgsContext so changing a control re-renders
// without remounting the tree.
export function composeStory(
    meta: CsfMeta,
    story: CsfStory,
    argTypes: ArgTypes,
): ComponentType {
    const parameters = { ...meta.parameters, ...story.parameters };
    const useStoryContext = (): StoryContext => ({
        args: useContext(ArgsContext),
        argTypes,
        parameters,
    });

    const Base = () => {
        const context = useStoryContext();
        if (story.render) return <>{story.render(context.args, context)}</>;
        const Component = meta.component;
        return Component ? <Component {...context.args} /> : null;
    };

    const decorators = [
        ...(story.decorators ?? []),
        ...(meta.decorators ?? []),
    ];
    return decorators.reduce<ComponentType>((Inner, decorate) => {
        const Decorated = () => <>{decorate(Inner, useStoryContext())}</>;
        return Decorated;
    }, Base);
}

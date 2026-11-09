'use client';

import type { Args, ResolvedStory } from '../types';
import { ArgsContext } from '../utils/argsContext';

interface StoryRendererProps {
    resolved: ResolvedStory;
    args: Args;
}

export default function StoryRenderer({ resolved, args }: StoryRendererProps) {
    const Story = resolved.Component;
    return (
        <ArgsContext.Provider value={args}>
            <Story />
        </ArgsContext.Provider>
    );
}

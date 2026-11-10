'use client';

import { ErrorBoundary } from 'react-error-boundary';
import type { Args, ResolvedStory } from '../types';
import { ArgsContext } from '../utils/argsContext';
import PreviewError from './PreviewError';

interface StoryRendererProps {
    resolved: ResolvedStory;
    args: Args;
}

export default function StoryRenderer({ resolved, args }: StoryRendererProps) {
    const Story = resolved.Component;
    return (
        <ArgsContext.Provider value={args}>
            {/* A prop combination that throws shows a message instead of
                breaking the page, and recovers when the args change. */}
            <ErrorBoundary
                resetKeys={[args]}
                fallbackRender={({ error }) => (
                    <PreviewError
                        message={
                            error instanceof Error
                                ? error.message
                                : String(error)
                        }
                    />
                )}
            >
                <Story />
            </ErrorBoundary>
        </ArgsContext.Provider>
    );
}

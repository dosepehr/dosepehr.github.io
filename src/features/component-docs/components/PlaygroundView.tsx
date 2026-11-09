'use client';

import CodeSnippet from '@/shared/ui/CodeSnippet';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { useMemo } from 'react';
import { usePlaygroundArgs } from '../hooks/usePlaygroundArgs';
import type { ResolvedStory } from '../types';
import { argsToJsx } from '../utils/argsToJsx';
import { buildControls } from '../utils/controls';
import ControlsPanel from './ControlsPanel';
import PreviewFrame from './PreviewFrame';
import StoryRenderer from './StoryRenderer';

// Live preview with editable props and the matching JSX.
export default function PlaygroundView({
    resolved,
}: {
    resolved: ResolvedStory;
}) {
    const { args, setArg, reset } = usePlaygroundArgs(resolved.args);
    const controls = useMemo(
        () => buildControls(resolved.argTypes, resolved.args),
        [resolved],
    );
    const code =
        resolved.info.source ?? argsToJsx(resolved.componentName, args);

    return (
        <div className="flex flex-col gap-4">
            <Tabs items={['Preview', 'Code']}>
                <Tab value="Preview" className="p-0">
                    <PreviewFrame layout={resolved.layout}>
                        <StoryRenderer resolved={resolved} args={args} />
                    </PreviewFrame>
                </Tab>
                <Tab value="Code" className="p-0">
                    <CodeSnippet code={code} lang="tsx" />
                </Tab>
            </Tabs>
            {controls.length > 0 && (
                <ControlsPanel
                    controls={controls}
                    args={args}
                    onChange={setArg}
                    onReset={reset}
                />
            )}
        </div>
    );
}

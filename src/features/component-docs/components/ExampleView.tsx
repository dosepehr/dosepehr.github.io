'use client';

import CodeSnippet from '@/shared/ui/CodeSnippet';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import type { ResolvedStory } from '../types';
import { argsToJsx } from '../utils/argsToJsx';
import PreviewFrame from './PreviewFrame';
import StoryRenderer from './StoryRenderer';

export default function ExampleView({ resolved }: { resolved: ResolvedStory }) {
    const code =
        resolved.info.source ??
        argsToJsx(resolved.componentName, resolved.args);

    return (
        <Tabs items={['Preview', 'Code']}>
            <Tab value="Preview" className="p-0">
                <PreviewFrame layout={resolved.layout}>
                    <StoryRenderer resolved={resolved} args={resolved.args} />
                </PreviewFrame>
            </Tab>
            <Tab value="Code" className="p-0">
                <CodeSnippet code={code} lang="tsx" />
            </Tab>
        </Tabs>
    );
}

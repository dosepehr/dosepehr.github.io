import { Suspense } from 'react';
import ExampleView from './components/ExampleView';
import PlaygroundView from './components/PlaygroundView';
import PropsView from './components/PropsView';
import type { ComponentDocsData, StoriesModule } from './types';
import { resolveStories } from './utils/csf';

// Binds a component's generated data and stories modules to the docs views.
// Called once per component by its generated client module.
export function createComponentDocs(
    data: ComponentDocsData,
    modules: StoriesModule[],
) {
    const stories = resolveStories(data, modules);

    const Playground = () => {
        const resolved = data.playgroundStory
            ? stories.get(data.playgroundStory)
            : undefined;
        // The playground reads its props from the URL (useSearchParams), which
        // a static export can only do on the client, inside Suspense.
        return resolved ? (
            <Suspense fallback={null}>
                <PlaygroundView resolved={resolved} />
            </Suspense>
        ) : null;
    };

    const Example = ({ id }: { id: string }) => {
        const resolved = stories.get(id);
        return resolved ? <ExampleView resolved={resolved} /> : null;
    };

    const Props = () => <PropsView data={data} />;

    return { Playground, Example, Props };
}

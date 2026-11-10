import { registryUrl } from '@/core/site';
import CodeSnippet from '@/shared/ui/CodeSnippet';

// The shadcn command that installs one registry item.
export default function InstallLine({ item }: { item: string }) {
    return (
        <CodeSnippet
            lang="bash"
            code={`npx shadcn@latest add ${registryUrl}/${item}.json`}
        />
    );
}

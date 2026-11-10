import { registryUrl } from '@/core/site';
import summary from '@/generated/summary.json';
import CodeSnippet from '@/shared/ui/CodeSnippet';
import HeroActions from './HeroActions';
import HeroBadge from './HeroBadge';
import HeroHeadline from './HeroHeadline';
import ThemeChip from './ThemeChip';

// The hero's copy: badge, rotating headline, subtitle, actions, install
// command and today's theme.
export default function HeroText() {
    return (
        <div className="flex w-full max-w-3xl min-w-0 flex-col items-center gap-7 text-center">
            <HeroBadge />
            <HeroHeadline />
            <p className="max-w-xl text-lg text-balance text-fd-muted-foreground">
                {summary.total} accessible, RTL-ready React components on
                Tailwind CSS v4. Install them with the shadcn CLI, then make
                them your own.
            </p>
            <HeroActions />
            <div className="w-full max-w-xl min-w-0">
                <CodeSnippet
                    lang="bash"
                    code={`npx shadcn@latest add ${registryUrl}/index.json`}
                />
            </div>
            <ThemeChip />
        </div>
    );
}

import { registryUrl } from '@/core/site';
import CodeSnippet from '@/shared/ui/CodeSnippet';
import HeroActions from './HeroActions';
import HeroBackground from './HeroBackground';
import HeroBadge from './HeroBadge';
import HeroCollage from './HeroCollage';
import HeroHeadline from './HeroHeadline';

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden">
            <HeroBackground />
            <div className="container mx-auto grid max-w-7xl items-center gap-12 px-4 pt-16 pb-20 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
                <div className="flex min-w-0 flex-col items-center gap-6 text-center lg:items-start lg:text-start">
                    <HeroBadge />
                    <HeroHeadline />
                    <p className="max-w-xl text-lg text-balance text-fd-muted-foreground">
                        Beautifully designed components for React and Next.js.
                        Install them with the shadcn CLI, then make them your
                        own.
                    </p>
                    <HeroActions />
                    <div className="w-full max-w-xl min-w-0">
                        <CodeSnippet
                            lang="bash"
                            code={`npx shadcn@latest add ${registryUrl}/index.json`}
                        />
                    </div>
                </div>
                <HeroCollage />
            </div>
        </section>
    );
}

import { docsRepoUrl, githubUrl, siteName } from '@/core/site';
import Logo from '@/shared/ui/Logo';

export default function SiteFooter() {
    return (
        <footer className="flex flex-col items-center gap-3 border-t py-10 text-center text-sm text-fd-muted-foreground">
            <span className="flex items-center gap-2 font-semibold text-fd-foreground">
                <Logo className="size-6" />
                {siteName}
            </span>
            <p>
                Built by{' '}
                <a
                    href="https://github.com/dosepehr"
                    className="font-medium underline-offset-4 hover:underline"
                >
                    dosepehr
                </a>
                . The source is on{' '}
                <a
                    href={githubUrl}
                    className="font-medium underline-offset-4 hover:underline"
                >
                    GitHub
                </a>{' '}
                (
                <a
                    href={docsRepoUrl}
                    className="underline-offset-4 hover:underline"
                >
                    docs
                </a>
                ).
            </p>
        </footer>
    );
}

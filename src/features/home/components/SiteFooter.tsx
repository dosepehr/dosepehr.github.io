import { docsRepoUrl, githubUrl } from '@/core/site';

export default function SiteFooter() {
    return (
        <footer className="border-t py-8 text-center text-sm text-fd-muted-foreground">
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
        </footer>
    );
}

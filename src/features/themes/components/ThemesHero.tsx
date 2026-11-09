export default function ThemesHero() {
    return (
        <header className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Make it yours
            </h1>
            <p className="max-w-2xl text-fd-muted-foreground">
                Pick a preset or choose your own colors for light and dark mode.
                The whole site follows your theme, and the CSS below is ready to
                paste into your project.
            </p>
        </header>
    );
}

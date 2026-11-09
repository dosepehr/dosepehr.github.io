import Showcase from '@/shared/showcase/Showcase';
import ThemeCssBlock from './components/ThemeCssBlock';
import ThemeCustomizer from './components/ThemeCustomizer';
import ThemesHero from './components/ThemesHero';

export default function ThemesPage() {
    return (
        <main className="container mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12">
            <ThemesHero />
            <div className="grid items-start gap-8 lg:grid-cols-[20rem_1fr]">
                <ThemeCustomizer />
                <Showcase />
            </div>
            <ThemeCssBlock />
        </main>
    );
}

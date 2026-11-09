import CtaBanner from './components/CtaBanner';
import FeatureGrid from './components/features/FeatureGrid';
import Hero from './components/hero/Hero';
import MotionProvider from './components/MotionProvider';
import RtlDemo from './components/rtl/RtlDemo';
import ShowcaseSection from './components/ShowcaseSection';
import SiteFooter from './components/SiteFooter';
import StatsStrip from './components/stats/StatsStrip';
import InstallSteps from './components/steps/InstallSteps';
import ThemeSection from './components/theme/ThemeSection';

export default function HomePage() {
    return (
        <MotionProvider>
            <main className="flex flex-col overflow-x-clip">
                <Hero />
                <StatsStrip />
                <FeatureGrid />
                <RtlDemo />
                <ThemeSection />
                <InstallSteps />
                <ShowcaseSection />
                <CtaBanner />
                <SiteFooter />
            </main>
        </MotionProvider>
    );
}

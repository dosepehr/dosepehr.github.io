import AiSection from './components/ai/AiSection';
import CodeCompare from './components/compare/CodeCompare';
import CtaBanner from './components/CtaBanner';
import FeatureGrid from './components/features/FeatureGrid';
import HeroBento from './components/hero/bento/HeroBento';
import MotionProvider from './components/MotionProvider';
import LayerStackSection from './components/project/stack/LayerStackSection';
import RtlDemo from './components/rtl/RtlDemo';
import SiteFooter from './components/SiteFooter';
import StatsStrip from './components/stats/StatsStrip';
import InstallSteps from './components/steps/InstallSteps';
import ThemeSection from './components/theme/ThemeSection';

export default function HomePage() {
    return (
        <MotionProvider>
            <main className="flex flex-col overflow-x-clip">
                <HeroBento />
                <StatsStrip />
                <FeatureGrid />
                <CodeCompare />
                <RtlDemo />
                <ThemeSection />
                <LayerStackSection />
                <AiSection />
                <InstallSteps />
                <CtaBanner />
                <SiteFooter />
            </main>
        </MotionProvider>
    );
}

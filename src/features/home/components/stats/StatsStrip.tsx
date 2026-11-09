import { PRESETS } from '@/core/theme/presets';
import summary from '@/generated/summary.json';
import Reveal from '../Reveal';
import StatItem from './StatItem';

export default function StatsStrip() {
    return (
        <section className="border-y bg-fd-card/50">
            <Reveal className="container mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
                <StatItem value={summary.total} label="components" />
                <StatItem
                    value={summary.byCategory.form}
                    label="react-hook-form fields"
                />
                <StatItem value={PRESETS.length} label="theme presets" />
                <StatItem value={100} suffix="%" label="RTL-ready" />
            </Reveal>
        </section>
    );
}

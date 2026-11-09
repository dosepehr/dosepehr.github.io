'use client';

import { useThemeStore } from '@/store/useThemeStore';
import Button from '@foundation/components/ui/Button';
import { RotateCcw } from 'lucide-react';
import ColorList from './ColorList';
import CustomizerSection from './CustomizerSection';
import ModeSwitch from './ModeSwitch';
import PresetPicker from './PresetPicker';
import RadiusPicker from './RadiusPicker';

export default function ThemeCustomizer() {
    const reset = useThemeStore((s) => s.reset);

    return (
        <aside className="flex flex-col gap-6 rounded-xl border bg-fd-card p-5 lg:sticky lg:top-20">
            <CustomizerSection title="Preset">
                <PresetPicker />
            </CustomizerSection>
            <CustomizerSection title="Mode">
                <ModeSwitch />
            </CustomizerSection>
            <CustomizerSection title="Colors">
                <ColorList />
            </CustomizerSection>
            <CustomizerSection title="Radius (rem)">
                <RadiusPicker />
            </CustomizerSection>
            <Button variant="outline" onClick={reset}>
                <RotateCcw />
                Reset to default
            </Button>
        </aside>
    );
}

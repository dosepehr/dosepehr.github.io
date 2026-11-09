'use client';

import { PRESETS } from '@/core/theme/presets';
import { useThemeStore } from '@/store/useThemeStore';
import PresetSwatch from './PresetSwatch';

export default function PresetPicker() {
    const presetId = useThemeStore((s) => s.presetId);
    const applyPreset = useThemeStore((s) => s.applyPreset);

    return (
        <div className="grid grid-cols-3 gap-2">
            {PRESETS.map((preset) => (
                <PresetSwatch
                    key={preset.id}
                    preset={preset}
                    active={preset.id === presetId}
                    onSelect={() => applyPreset(preset.id)}
                />
            ))}
        </div>
    );
}

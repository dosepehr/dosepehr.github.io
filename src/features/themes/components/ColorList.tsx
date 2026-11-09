'use client';

import { COLOR_KEYS } from '@/core/theme/types';
import { useEditingMode } from '../hooks/useEditingMode';
import ColorField from './ColorField';

export default function ColorList() {
    const { mode } = useEditingMode();

    return (
        <div className="flex flex-col gap-3">
            {COLOR_KEYS.map((key) => (
                <ColorField key={`${mode}-${key}`} mode={mode} colorKey={key} />
            ))}
        </div>
    );
}

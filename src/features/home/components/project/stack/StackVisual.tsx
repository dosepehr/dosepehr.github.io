'use client';

import { useIsMobile } from '@foundation/utils/hooks/useIsMobile';
import { LAYERS } from '../layersData';
import StackSlab from './StackSlab';
import { STACK_SPACING } from './stackLayout';

interface StackVisualProps {
    active: number;
    onSelect: (index: number) => void;
}

// The six layers as an exploded isometric stack, theme at the bottom. The
// stack sits low in its box because the layers rise upwards.
export default function StackVisual({ active, onSelect }: StackVisualProps) {
    const compact = useIsMobile(640);
    const spacing = STACK_SPACING[compact ? 'compact' : 'regular'];
    return (
        <div
            className="flex h-80 items-end justify-center pb-10 perspective-[1600px] sm:h-120 sm:pb-20"
            dir="ltr"
        >
            <div className="relative h-32 w-56 transform-[rotateX(58deg)_rotateZ(-38deg)] transform-3d sm:h-44 sm:w-80">
                {LAYERS.map((layer, level) => (
                    <StackSlab
                        key={layer.id}
                        layer={layer}
                        level={level}
                        active={active}
                        spacing={spacing}
                        onSelect={() => onSelect(level)}
                    />
                ))}
            </div>
        </div>
    );
}

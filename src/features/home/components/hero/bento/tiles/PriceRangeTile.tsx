'use client';

import { countInRange } from '@/features/home/utils';
import RangeInput from '@foundation/components/ui/RangeInput';
import type { RangeValue } from '@foundation/components/ui/RangeInput/RangeInput.types';
import { useState } from 'react';
import BentoTile from '../BentoTile';
import { PRICE_BOUNDS, STAY_PRICES } from '../bentoData';

export default function PriceRangeTile({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    const [range, setRange] = useState<RangeValue>([80, 300]);
    const matches = countInRange(STAY_PRICES, range);

    return (
        <BentoTile
            title="Price filter"
            hint={`${matches} of ${STAY_PRICES.length} stays`}
            index={index}
            className={className}
        >
            <RangeInput
                value={range}
                onValueChange={setRange}
                min={PRICE_BOUNDS.min}
                max={PRICE_BOUNDS.max}
                step={10}
                showSlider
                startAddon="$"
                fromLabel="Minimum price"
                toLabel="Maximum price"
                fromPlaceholder="Min"
                toPlaceholder="Max"
            />
        </BentoTile>
    );
}

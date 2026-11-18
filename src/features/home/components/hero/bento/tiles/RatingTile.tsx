'use client';

import Rating from '@foundation/components/ui/Rating';
import { useState } from 'react';
import BentoTile from '../BentoTile';
import { REVIEWS } from '../bentoData';

export default function RatingTile({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    const [score, setScore] = useState(0);

    return (
        <BentoTile
            title="Reviews"
            hint={`${REVIEWS.count} ratings`}
            index={index}
            className={className}
        >
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold tabular-nums">
                        {REVIEWS.average}
                    </span>
                    <Rating
                        value={REVIEWS.average}
                        allowHalf
                        readOnly
                        size="sm"
                        aria-label={`Rated ${REVIEWS.average} out of 5`}
                    />
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl border p-3">
                    <span className="text-xs text-muted-foreground">
                        {score ? `You gave ${score}` : 'Your rating'}
                    </span>
                    <Rating
                        value={score}
                        onValueChange={setScore}
                        allowHalf
                        allowClear
                        aria-label="Your rating"
                    />
                </div>
            </div>
        </BentoTile>
    );
}

'use client';

import Calendar from '@foundation/components/ui/Calendar';
import { useState } from 'react';
import BentoTile from '../BentoTile';

export default function CalendarTile({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <BentoTile
            title="Calendar"
            hint="Pick a day"
            index={index}
            className={className}
        >
            <div className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-xl border"
                />
            </div>
        </BentoTile>
    );
}

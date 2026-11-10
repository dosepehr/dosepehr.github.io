'use client';

import { useAutoType } from '@/features/home/hooks/useAutoType';
import OtpInput from '@foundation/components/ui/OtpInput';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import BentoTile from '../BentoTile';
import { OTP_CODE } from '../bentoData';

export default function OtpTile({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { value, setValue, done } = useAutoType(OTP_CODE, inView);

    return (
        <BentoTile
            title="One-time code"
            hint={done ? 'Your turn: edit it' : 'Filling in…'}
            index={index}
            className={className}
        >
            <div ref={ref} className="flex justify-center">
                <OtpInput length={6} value={value} onChange={setValue} />
            </div>
        </BentoTile>
    );
}

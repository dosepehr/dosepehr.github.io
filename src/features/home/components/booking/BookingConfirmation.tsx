'use client';

import Button from '@foundation/components/ui/Button';
import Rating from '@foundation/components/ui/Rating';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import type { BookingDTO } from '../../schemas/booking.schema';
import { countNights } from '../../utils';
import { ROOM_OPTIONS } from './bookingData';

interface BookingConfirmationProps {
    booking: BookingDTO;
    onRestart: () => void;
}

export default function BookingConfirmation({
    booking,
    onRestart,
}: BookingConfirmationProps) {
    const [score, setScore] = useState(0);
    const nights = countNights(booking.stay);
    const room = ROOM_OPTIONS.find((r) => r.value === booking.room)?.label;

    return (
        <div className="flex flex-col items-center gap-6 py-6 text-center">
            <CircleCheck className="size-10 text-success" />
            <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">
                    You&apos;re booked, {booking.fullName}
                </p>
                <p className="text-sm text-muted-foreground">
                    {room} · {nights} {nights === 1 ? 'night' : 'nights'} ·{' '}
                    {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}{' '}
                    · check-in {booking.checkIn}
                </p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Rating
                    value={score}
                    onValueChange={setScore}
                    allowHalf
                    size="lg"
                    aria-label="Rate this form"
                />
                <p className="text-xs text-muted-foreground">
                    {score
                        ? `Thanks! You rated it ${score} out of 5.`
                        : 'How was this form?'}
                </p>
            </div>
            <Button variant="outline" size="sm" onClick={onRestart}>
                Book another stay
            </Button>
        </div>
    );
}

'use client';

import { ControlledDateRangePicker } from '@foundation/components/controlled/ControlledDateRangePicker';
import { ControlledNumberInput } from '@foundation/components/controlled/ControlledNumberInput';
import { ControlledTimePicker } from '@foundation/components/controlled/ControlledTimePicker';
import type { Control } from 'react-hook-form';
import type { BookingDTO } from '../../schemas/booking.schema';

export default function StayStep({
    control,
}: {
    control: Control<BookingDTO>;
}) {
    return (
        <>
            <ControlledDateRangePicker
                name="stay"
                control={control}
                label="Dates"
                placeholder="Select the dates"
                disabledDates={{ before: new Date() }}
                minDays={1}
                closeOnSelect
                required
            />
            <div className="grid gap-8 sm:grid-cols-2">
                <ControlledTimePicker
                    name="checkIn"
                    control={control}
                    label="Check-in time"
                    placeholder="Select the check-in time"
                    minuteStep={15}
                    required
                />
                <ControlledNumberInput
                    name="guests"
                    control={control}
                    label="Guests"
                    placeholder="Enter the guests"
                    min={1}
                    max={6}
                    showStepper
                    required
                />
            </div>
        </>
    );
}

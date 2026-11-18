'use client';

import { ControlledPriceInput } from '@foundation/components/controlled/ControlledPriceInput';
import { ControlledSwitch } from '@foundation/components/controlled/ControlledSwitch';
import { ControlledTreeSelect } from '@foundation/components/controlled/ControlledTreeSelect';
import type { Control } from 'react-hook-form';
import type { BookingDTO } from '../../schemas/booking.schema';
import { EXTRA_OPTIONS } from './bookingData';

export default function ExtrasStep({
    control,
}: {
    control: Control<BookingDTO>;
}) {
    return (
        <>
            <ControlledTreeSelect
                name="extras"
                control={control}
                label="Extras"
                placeholder="Select the extras"
                options={EXTRA_OPTIONS}
            />
            <ControlledPriceInput
                name="budget"
                control={control}
                label="Nightly budget"
                placeholder="Enter the nightly budget"
                currency="$"
                words="en"
                wordsUnit="dollars"
                required
            />
            <ControlledSwitch
                name="flexible"
                control={control}
                label="Free cancellation"
                description="Cancel up to 48 hours before check-in."
            />
        </>
    );
}

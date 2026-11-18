'use client';

import { ControlledMobileInput } from '@foundation/components/controlled/ControlledMobileInput';
import { ControlledSelect } from '@foundation/components/controlled/ControlledSelect';
import Input from '@foundation/components/ui/Input';
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import type { BookingDTO } from '../../schemas/booking.schema';
import { ROOM_OPTIONS } from './bookingData';

interface GuestStepProps {
    control: Control<BookingDTO>;
    register: UseFormRegister<BookingDTO>;
    errors: FieldErrors<BookingDTO>;
}

export default function GuestStep({
    control,
    register,
    errors,
}: GuestStepProps) {
    return (
        <>
            <Input
                label="Full name"
                placeholder="Enter the full name"
                required
                error={errors.fullName?.message}
                {...register('fullName')}
            />
            <ControlledMobileInput
                name="mobile"
                control={control}
                label="Mobile number"
                placeholder="Enter the mobile number"
                description="Any digits work: 0912…, ۰۹۱۲… or +98 912…"
                required
            />
            <ControlledSelect
                name="room"
                control={control}
                label="Room"
                placeholder="Select the room"
                options={ROOM_OPTIONS}
                required
            />
        </>
    );
}

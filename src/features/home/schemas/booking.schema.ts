import { isValidMobile } from '@foundation/components/ui/MobileInput/utils/mobile/mobile';
import type { DateRange } from 'react-day-picker';
import { z } from 'zod';

export const bookingSchema = z.object({
    stay: z
        .custom<DateRange | undefined>()
        .refine(
            (range) => Boolean(range?.from && range?.to),
            'Select the check-in and check-out dates',
        ),
    checkIn: z
        .string('Select the check-in time')
        .min(1, 'Select the check-in time'),
    guests: z
        .number('Enter the number of guests')
        .min(1, 'At least one guest')
        .max(6, 'Up to six guests'),
    fullName: z.string().min(2, 'Enter the full name'),
    mobile: z.string().refine(isValidMobile, 'Enter a valid mobile number'),
    room: z.string().min(1, 'Select the room'),
    extras: z.array(z.string()),
    budget: z
        .number('Enter the nightly budget')
        .min(20, 'At least $20 a night'),
    flexible: z.boolean(),
});

export type BookingDTO = z.infer<typeof bookingSchema>;

export const bookingDefaults: BookingDTO = {
    stay: undefined,
    checkIn: '14:00',
    guests: 2,
    fullName: '',
    mobile: '',
    room: '',
    extras: [],
    budget: 120,
    flexible: true,
};

/** Fields validated before leaving each step, in step order. */
export const BOOKING_STEP_FIELDS: (keyof BookingDTO)[][] = [
    ['stay', 'checkIn', 'guests'],
    ['fullName', 'mobile', 'room'],
    ['extras', 'budget', 'flexible'],
];

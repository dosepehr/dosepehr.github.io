'use client';

import { FieldGroup } from '@foundation/components/ui/Field';
import Stepper from '@foundation/components/ui/Stepper';
import { useStepper } from '@foundation/components/ui/Stepper/hooks/useStepper/useStepper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    BOOKING_STEP_FIELDS,
    type BookingDTO,
    bookingDefaults,
    bookingSchema,
} from '../../schemas/booking.schema';
import BookingConfirmation from './BookingConfirmation';
import { BOOKING_STEPS } from './bookingData';
import ExtrasStep from './ExtrasStep';
import GuestStep from './GuestStep';
import StayStep from './StayStep';
import WizardActions from './WizardActions';

// A three-step react-hook-form + zod form: each step validates only its own
// fields before moving on, and a step with errors turns red in the stepper.
export default function BookingWizard() {
    const { activeStep, isFirst, isLast, next, back, goTo, reset } = useStepper(
        { count: BOOKING_STEPS.length },
    );
    const [booking, setBooking] = useState<BookingDTO | null>(null);
    const {
        register,
        control,
        handleSubmit,
        trigger,
        reset: resetForm,
        formState: { errors },
    } = useForm<BookingDTO>({
        defaultValues: bookingDefaults,
        resolver: zodResolver(bookingSchema),
    });

    const steps = BOOKING_STEPS.map((step, index) => ({
        ...step,
        error: BOOKING_STEP_FIELDS[index].some((field) => errors[field]),
    }));

    const onNext = async () => {
        if (await trigger(BOOKING_STEP_FIELDS[activeStep])) next();
    };

    const onSubmit = (values: BookingDTO) => setBooking(values);

    const onRestart = () => {
        resetForm(bookingDefaults);
        reset();
        setBooking(null);
    };

    if (booking) {
        return <BookingConfirmation booking={booking} onRestart={onRestart} />;
    }

    return (
        <div className="flex flex-col gap-8">
            <Stepper
                steps={steps}
                activeStep={activeStep}
                onStepClick={goTo}
                aria-label="Booking steps"
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-8"
            >
                <FieldGroup>
                    {activeStep === 0 && <StayStep control={control} />}
                    {activeStep === 1 && (
                        <GuestStep
                            control={control}
                            register={register}
                            errors={errors}
                        />
                    )}
                    {activeStep === 2 && <ExtrasStep control={control} />}
                </FieldGroup>
                <WizardActions
                    isFirst={isFirst}
                    isLast={isLast}
                    onBack={back}
                    onNext={onNext}
                />
            </form>
        </div>
    );
}

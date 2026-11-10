'use client';

import Button from '@foundation/components/ui/Button';
import { FieldGroup } from '@foundation/components/ui/Field';
import Input from '@foundation/components/ui/Input';
import PasswordInput from '@foundation/components/ui/PasswordInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type SignUpDTO, signUpSchema } from '../../../schemas/signUp.schema';

// A real react-hook-form + zod form: submit it empty to see the errors.
export default function SignUpForm() {
    const [doneFor, setDoneFor] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignUpDTO>({ resolver: zodResolver(signUpSchema) });

    const onSubmit = (values: SignUpDTO) => {
        setDoneFor(values.email);
        reset();
    };

    if (doneFor) {
        return (
            <div className="flex flex-col items-center gap-3 text-center">
                <CircleCheck className="size-8 text-success" />
                <p className="text-sm">
                    Welcome aboard,{' '}
                    <span className="font-medium">{doneFor}</span>
                </p>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDoneFor(null)}
                >
                    Start over
                </Button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6"
        >
            <FieldGroup>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter the email"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Enter the password"
                    error={errors.password?.message}
                    {...register('password')}
                />
            </FieldGroup>
            <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                    Create account
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                    By continuing you agree to the Terms and Privacy Policy.
                </p>
            </div>
        </form>
    );
}

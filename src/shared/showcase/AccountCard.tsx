'use client';

import Button from '@foundation/components/ui/Button';
import Card from '@foundation/components/ui/Card';
import { FieldGroup } from '@foundation/components/ui/Field';
import Input from '@foundation/components/ui/Input';
import PasswordInput from '@foundation/components/ui/PasswordInput';

export default function AccountCard() {
    return (
        <Card
            title="Create an account"
            description="Enter your details below to create your account."
            footer={<Button className="w-full">Create account</Button>}
        >
            <FieldGroup>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter the email"
                    required
                />
                <PasswordInput
                    label="Password"
                    placeholder="Enter the password"
                    required
                />
            </FieldGroup>
        </Card>
    );
}

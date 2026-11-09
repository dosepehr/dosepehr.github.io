'use client';

import Input from '@foundation/components/ui/Input';
import Select from '@foundation/components/ui/Select';
import Switch from '@foundation/components/ui/Switch';
import type { ControlSpec } from '../types';

interface ControlFieldProps {
    spec: ControlSpec;
    value: unknown;
    onChange: (value: unknown) => void;
}

// One playground control, built from the library's own form components.
export default function ControlField({
    spec,
    value,
    onChange,
}: ControlFieldProps) {
    const { name, control } = spec;

    switch (control.kind) {
        case 'select': {
            return (
                <Select
                    label={name}
                    placeholder={`Select the ${name}`}
                    options={control.options.map((option) => ({
                        value: option,
                        label: option,
                    }))}
                    value={
                        value === undefined || value === null
                            ? undefined
                            : String(value)
                    }
                    onValueChange={onChange}
                />
            );
        }
        case 'boolean': {
            return (
                <Switch
                    label={name}
                    checked={Boolean(value)}
                    onCheckedChange={(checked: boolean) => onChange(checked)}
                />
            );
        }
        case 'number': {
            return (
                <Input
                    label={name}
                    type="number"
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    placeholder={`Enter the ${name}`}
                    value={typeof value === 'number' ? value : ''}
                    onChange={(e) =>
                        onChange(
                            e.target.value === ''
                                ? undefined
                                : Number(e.target.value),
                        )
                    }
                />
            );
        }
        case 'color': {
            return (
                <Input
                    label={name}
                    type="color"
                    value={typeof value === 'string' ? value : '#000000'}
                    onChange={(e) => onChange(e.target.value)}
                />
            );
        }
        default: {
            return (
                <Input
                    label={name}
                    placeholder={`Enter the ${name}`}
                    value={typeof value === 'string' ? value : ''}
                    onChange={(e) => onChange(e.target.value)}
                />
            );
        }
    }
}

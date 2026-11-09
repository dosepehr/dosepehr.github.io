'use client';

import Button from '@foundation/components/ui/Button';
import { FieldGroup } from '@foundation/components/ui/Field';
import { cn } from '@foundation/utils/funcs/cn';
import { RotateCcw } from 'lucide-react';
import type { Args, ControlSpec } from '../types';
import ControlField from './ControlField';

interface ControlsPanelProps {
    controls: ControlSpec[];
    args: Args;
    onChange: (name: string, value: unknown) => void;
    onReset: () => void;
}

export default function ControlsPanel({
    controls,
    args,
    onChange,
    onReset,
}: ControlsPanelProps) {
    // Inputs and selects in a grid; on/off props as a compact row of toggles.
    const fields = controls.filter((c) => c.control.kind !== 'boolean');
    const toggles = controls.filter((c) => c.control.kind === 'boolean');

    return (
        <div className="not-prose rounded-xl border bg-fd-card p-4">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium">Props</p>
                <Button variant="ghost" size="sm" onClick={onReset}>
                    <RotateCcw />
                    Reset
                </Button>
            </div>
            {fields.length > 0 && (
                <FieldGroup className="grid gap-x-6 sm:grid-cols-2">
                    {fields.map((spec) => (
                        <ControlField
                            key={spec.name}
                            spec={spec}
                            value={args[spec.name]}
                            onChange={(value) => onChange(spec.name, value)}
                        />
                    ))}
                </FieldGroup>
            )}
            {toggles.length > 0 && (
                <div
                    className={cn(
                        'flex flex-wrap gap-3',
                        fields.length > 0 && 'mt-8',
                    )}
                >
                    {toggles.map((spec) => (
                        <ControlField
                            key={spec.name}
                            spec={spec}
                            value={args[spec.name]}
                            onChange={(value) => onChange(spec.name, value)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

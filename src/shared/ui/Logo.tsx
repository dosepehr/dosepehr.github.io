import { cn } from '@foundation/utils/funcs/cn';
import { useId } from 'react';

interface LogoProps {
    className?: string;
}

// The Frontend Foundation mark: an "F" built from foundation blocks, on a
// tile whose gradient follows the theme's primary color.
export default function Logo({ className }: LogoProps) {
    const id = useId();
    return (
        <svg
            viewBox="0 0 32 32"
            aria-hidden
            className={cn('size-7 shrink-0', className)}
        >
            <defs>
                <linearGradient
                    id={id}
                    x1="0"
                    y1="0"
                    x2="32"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" style={{ stopColor: 'var(--primary)' }} />
                    <stop
                        offset="1"
                        style={{
                            stopColor:
                                'color-mix(in oklch, var(--primary) 55%, #ec4899)',
                        }}
                    />
                </linearGradient>
            </defs>
            <rect width="32" height="32" rx="9" fill={`url(#${id})`} />
            <rect x="9" y="7.5" width="4.2" height="17" rx="2.1" fill="#fff" />
            <rect x="9" y="7.5" width="14" height="4.2" rx="2.1" fill="#fff" />
            <rect
                x="9"
                y="14.4"
                width="10"
                height="4.2"
                rx="2.1"
                fill="#fff"
                fillOpacity="0.85"
            />
            <rect
                x="19.2"
                y="20.4"
                width="4.2"
                height="4.2"
                rx="1.3"
                fill="#fff"
                fillOpacity="0.6"
            />
        </svg>
    );
}

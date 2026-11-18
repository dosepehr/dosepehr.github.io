import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { BOOKING_PARTS } from './bookingData';

// The components the wizard is made of, each linking to its docs page.
export default function BookingParts() {
    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold">Built from</p>
            <ul className="flex flex-wrap gap-2">
                {BOOKING_PARTS.map((part) => (
                    <li key={part.href}>
                        <Link
                            href={part.href}
                            className="group inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary-text"
                        >
                            {part.name}
                            <ArrowUpRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-primary-text rtl:-scale-x-100" />
                        </Link>
                    </li>
                ))}
            </ul>
            <p className="text-sm text-muted-foreground">
                Each field comes from <code>components/controlled</code>: pass
                the form&apos;s <code>control</code> and a <code>name</code>,
                and its value, change handler and zod error are wired for you.
            </p>
        </div>
    );
}

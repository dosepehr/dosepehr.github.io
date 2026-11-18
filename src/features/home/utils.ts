import { differenceInCalendarDays } from 'date-fns';

// Number of class names in the className attributes of a JSX snippet.
export function countClasses(code: string): number {
    return [...code.matchAll(/className="([^"]*)"/g)].reduce(
        (total, [, classes]) =>
            total + classes.split(/\s+/).filter(Boolean).length,
        0,
    );
}

// 214 -> "3:34"
export function formatTime(seconds: number): string {
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}

// Nights between the two ends of a booked stay; 0 until both are picked.
export function countNights(range?: { from?: Date; to?: Date }): number {
    if (!range?.from || !range.to) return 0;
    return Math.max(differenceInCalendarDays(range.to, range.from), 0);
}

// How many prices fall in a [from, to] range; a null end is left open.
export function countInRange(
    prices: number[],
    [from, to]: [number | null, number | null],
): number {
    return prices.filter(
        (price) =>
            (from === null || price >= from) && (to === null || price <= to),
    ).length;
}

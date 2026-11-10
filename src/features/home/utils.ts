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

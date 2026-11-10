import { TriangleAlert } from 'lucide-react';

// Shown in place of a preview whose current props can't render.
export default function PreviewError({ message }: { message: string }) {
    return (
        <div
            role="alert"
            className="flex max-w-md items-start gap-3 rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm"
        >
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning-text" />
            <div className="flex flex-col gap-1">
                <p className="font-medium text-warning-text">
                    This combination of props can&apos;t render.
                </p>
                <p className="text-muted-foreground">{message}</p>
                <p className="text-muted-foreground">
                    Change a prop or press Reset to try again.
                </p>
            </div>
        </div>
    );
}

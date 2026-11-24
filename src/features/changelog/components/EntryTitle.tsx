import { splitCode } from '../utils';

// An entry's title, with `backtick` spans rendered as inline code.
export default function EntryTitle({ title }: { title: string }) {
    return (
        <p className="font-medium">
            {splitCode(title).map((part, i) =>
                part.code ? (
                    <code
                        key={i}
                        className="rounded bg-fd-muted px-1 py-0.5 font-mono text-[0.85em]"
                    >
                        {part.text}
                    </code>
                ) : (
                    <span key={i}>{part.text}</span>
                ),
            )}
        </p>
    );
}

import Badge from '@foundation/components/ui/Badge';

// The names of what ships in a layer, as chips.
export default function LayerItems({ items }: { items: string[] }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {items.map((item) => (
                <Badge
                    key={item}
                    variant="secondary"
                    appearance="soft"
                    className="font-mono"
                >
                    {item}
                </Badge>
            ))}
        </div>
    );
}

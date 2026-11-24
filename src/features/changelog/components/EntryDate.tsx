import { formatDate } from '../utils';

export default function EntryDate({ date }: { date: string }) {
    return (
        <time
            dateTime={date}
            className="shrink-0 text-xs text-fd-muted-foreground"
        >
            {formatDate(date)}
        </time>
    );
}

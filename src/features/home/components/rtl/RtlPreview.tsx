'use client';

import Badge from '@foundation/components/ui/Badge';
import Button from '@foundation/components/ui/Button';
import { Bell } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { RTL_COPY } from '../../constants';

// A notification card that mirrors when the direction flips; `layout`
// animates every piece to its new side.
export default function RtlPreview({ dir }: { dir: 'ltr' | 'rtl' }) {
    const copy = RTL_COPY[dir];

    return (
        <motion.div
            layout
            dir={dir}
            lang={dir === 'rtl' ? 'fa' : 'en'}
            className="flex w-full max-w-md flex-col gap-4 rounded-2xl border bg-card p-5 text-card-foreground shadow-xl shadow-black/5"
        >
            <motion.div layout className="flex items-center gap-3">
                <motion.span
                    layout
                    className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                    <Bell className="size-5" />
                </motion.span>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={dir}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col"
                    >
                        <span className="font-semibold">{copy.title}</span>
                        <span className="text-sm text-muted-foreground">
                            {copy.body}
                        </span>
                    </motion.div>
                </AnimatePresence>
                <motion.div layout className="ms-auto">
                    <Badge variant="success">{copy.badge}</Badge>
                </motion.div>
            </motion.div>
            <motion.div layout className="flex gap-2">
                <Button size="sm">{copy.action}</Button>
                <Button size="sm" variant="ghost">
                    {copy.dismiss}
                </Button>
            </motion.div>
        </motion.div>
    );
}

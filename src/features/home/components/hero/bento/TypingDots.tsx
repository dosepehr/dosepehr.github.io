'use client';

import { motion } from 'motion/react';

export default function TypingDots() {
    return (
        <span
            className="inline-flex items-center gap-1 rounded-2xl bg-muted px-3 py-2.5"
            aria-label="Typing"
        >
            {[0, 1, 2].map((dot) => (
                <motion.span
                    key={dot}
                    className="size-1.5 rounded-full bg-muted-foreground"
                    animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: dot * 0.15,
                    }}
                />
            ))}
        </span>
    );
}

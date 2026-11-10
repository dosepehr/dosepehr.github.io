'use client';

import { useChatPlayback } from '@/features/home/hooks/useChatPlayback';
import Bubble from '@foundation/components/ui/Bubble';
import Button from '@foundation/components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { BENTO_CHAT } from '../bentoData';
import BentoTile from '../BentoTile';
import TypingDots from '../TypingDots';

export default function ChatTile({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const { shown, typing, replay, finished } = useChatPlayback(
        BENTO_CHAT.length,
        inView,
    );
    const next = BENTO_CHAT[shown];

    return (
        <BentoTile
            title="Chat"
            hint="Bubbles that type"
            index={index}
            className={className}
        >
            <div ref={ref} className="flex min-h-64 flex-col justify-end gap-2">
                <AnimatePresence initial={false}>
                    {BENTO_CHAT.slice(0, shown).map((message) => (
                        <motion.div
                            key={message.text}
                            layout
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={
                                message.from === 'me'
                                    ? 'flex justify-end'
                                    : 'flex justify-start'
                            }
                        >
                            <Bubble
                                align={message.from === 'me' ? 'end' : 'start'}
                                variant={
                                    message.from === 'me' ? 'default' : 'muted'
                                }
                            >
                                {message.text}
                            </Bubble>
                        </motion.div>
                    ))}
                    {typing && next && (
                        <motion.div
                            key="typing"
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={
                                next.from === 'me'
                                    ? 'flex justify-end'
                                    : 'flex justify-start'
                            }
                        >
                            <TypingDots />
                        </motion.div>
                    )}
                </AnimatePresence>
                {finished && (
                    <Button
                        size="xs"
                        variant="ghost"
                        onClick={replay}
                        className="self-center"
                    >
                        <RotateCcw />
                        Replay
                    </Button>
                )}
            </div>
        </BentoTile>
    );
}

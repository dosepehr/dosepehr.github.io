'use client';

import Button from '@foundation/components/ui/Button';
import Marker from '@foundation/components/ui/Marker';
import Message from '@foundation/components/ui/Message';
import { RotateCcw, Sparkles } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { CHAT_ANSWER_CODE, CHAT_QUESTION } from '../../constants';
import { useChatScript } from '../../hooks/useChatScript';
import StreamingCode from './StreamingCode';

const appear = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
};

export default function ChatWindow() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-120px' });
    const { stage, streamed, replay } = useChatScript(
        inView,
        CHAT_ANSWER_CODE.length,
    );

    return (
        <div
            ref={ref}
            className="flex min-h-120 flex-col gap-5 rounded-2xl border bg-card p-5 text-card-foreground shadow-xl shadow-black/5"
        >
            <div className="flex items-center justify-between border-b pb-3">
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="size-4 text-primary" />
                    Assistant
                </span>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={replay}
                    disabled={stage !== 'done'}
                >
                    <RotateCcw />
                    Replay
                </Button>
            </div>
            <AnimatePresence>
                {stage !== 'idle' && (
                    <motion.div key="question" {...appear}>
                        <Message align="end" avatarFallback="SD">
                            {CHAT_QUESTION}
                        </Message>
                    </motion.div>
                )}
                {stage === 'thinking' && (
                    <motion.div key="thinking" {...appear}>
                        <Marker shimmer icon={<Sparkles className="size-4" />}>
                            Thinking…
                        </Marker>
                    </motion.div>
                )}
                {(stage === 'answering' || stage === 'done') && (
                    <motion.div
                        key="answer"
                        {...appear}
                        className="flex flex-col gap-3"
                    >
                        <Message
                            align="start"
                            avatarFallback="AI"
                            variant="muted"
                        >
                            Here&apos;s a pricing card built from Card, Badge
                            and Button:
                        </Message>
                        <StreamingCode
                            code={CHAT_ANSWER_CODE.slice(0, streamed)}
                            complete={stage === 'done'}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

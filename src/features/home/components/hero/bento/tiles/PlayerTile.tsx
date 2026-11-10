'use client';

import { usePlayer } from '@/features/home/hooks/usePlayer';
import { formatTime } from '@/features/home/utils';
import Button from '@foundation/components/ui/Button';
import Slider from '@foundation/components/ui/Slider';
import { Music, Pause, Play } from 'lucide-react';
import { motion } from 'motion/react';
import BentoTile from '../BentoTile';
import { TRACK } from '../bentoData';

export default function PlayerTile({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    const { playing, toggle, position, seek } = usePlayer(TRACK.seconds);

    return (
        <BentoTile
            title="Player"
            hint="Slider + button"
            index={index}
            className={className}
        >
            <div className="flex items-center gap-4">
                <motion.span
                    animate={playing ? { rotate: 360 } : { rotate: 0 }}
                    transition={
                        playing
                            ? { duration: 6, repeat: Infinity, ease: 'linear' }
                            : { duration: 0.3 }
                    }
                    className="flex size-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-[color-mix(in_oklch,var(--primary)_45%,#ec4899)] text-primary-foreground"
                >
                    <Music className="size-6" />
                </motion.span>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex min-w-0 flex-col">
                            <span className="truncate text-sm font-medium">
                                {TRACK.title}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                                {TRACK.artist}
                            </span>
                        </div>
                        <Button
                            size="icon-sm"
                            onClick={toggle}
                            aria-label={playing ? 'Pause' : 'Play'}
                        >
                            {playing ? <Pause /> : <Play />}
                        </Button>
                    </div>
                    <Slider
                        value={[position]}
                        max={TRACK.seconds}
                        onValueChange={([value]) => seek(value)}
                        aria-label="Seek"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
                        <span>{formatTime(position)}</span>
                        <span>{formatTime(TRACK.seconds)}</span>
                    </div>
                </div>
            </div>
        </BentoTile>
    );
}

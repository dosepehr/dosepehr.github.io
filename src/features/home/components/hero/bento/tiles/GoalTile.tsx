'use client';

import { useGoal } from '@/features/home/hooks/useGoal';
import Button from '@foundation/components/ui/Button';
import { Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import BentoTile from '../BentoTile';
import { GOAL_HISTORY } from '../bentoData';

const PEAK = Math.max(...GOAL_HISTORY);

// Nudge the goal; the bars that meet it light up.
export default function GoalTile({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    const { goal, increase, decrease, canIncrease, canDecrease } = useGoal();
    return (
        <BentoTile
            title="Daily goal"
            hint="Steps"
            index={index}
            className={className}
        >
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-3">
                    <Button
                        size="icon-sm"
                        variant="outline"
                        onClick={decrease}
                        disabled={!canDecrease}
                        aria-label="Lower the goal"
                    >
                        <Minus />
                    </Button>
                    <div className="flex flex-col items-center">
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                                key={goal}
                                initial={{ y: 12, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -12, opacity: 0 }}
                                className="text-4xl font-bold tracking-tight tabular-nums"
                            >
                                {goal.toLocaleString('en-US')}
                            </motion.span>
                        </AnimatePresence>
                        <span className="text-xs text-muted-foreground">
                            steps / day
                        </span>
                    </div>
                    <Button
                        size="icon-sm"
                        variant="outline"
                        onClick={increase}
                        disabled={!canIncrease}
                        aria-label="Raise the goal"
                    >
                        <Plus />
                    </Button>
                </div>
                <div className="flex h-16 items-end gap-1.5" aria-hidden>
                    {GOAL_HISTORY.map((steps, day) => (
                        <motion.div
                            key={day}
                            className="flex-1 rounded-sm"
                            style={{ height: `${(steps / PEAK) * 100}%` }}
                            animate={{
                                backgroundColor:
                                    steps >= goal
                                        ? 'var(--primary)'
                                        : 'var(--muted)',
                            }}
                        />
                    ))}
                </div>
            </div>
        </BentoTile>
    );
}

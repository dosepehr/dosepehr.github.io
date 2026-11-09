'use client';

import Avatar from '@foundation/components/ui/Avatar';
import Badge from '@foundation/components/ui/Badge';
import Button from '@foundation/components/ui/Button';
import Kbd from '@foundation/components/ui/Kbd';
import Progress from '@foundation/components/ui/Progress';
import Switch from '@foundation/components/ui/Switch';
import { Search } from 'lucide-react';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import FloatingCard from './FloatingCard';

const TEAM = ['SD', 'AK', 'MR', 'NP'];

// Real components floating at different depths around the hero.
export default function HeroCollage() {
    const { x, y, onPointerMove, onPointerLeave } = usePointerParallax();
    const card = { pointerX: x, pointerY: y };

    return (
        <div
            className="relative hidden h-120 w-full lg:block"
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            aria-hidden
        >
            <FloatingCard
                {...card}
                depth={1}
                delay={0.3}
                className="start-4 top-6 w-72"
            >
                <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground">
                    <Search className="size-4" />
                    Search components…
                    <Kbd className="ms-auto">⌘K</Kbd>
                </div>
            </FloatingCard>
            <FloatingCard
                {...card}
                depth={2}
                delay={0.45}
                className="end-0 top-24 w-64"
            >
                <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-1.5">
                        <Badge variant="success">Shipped</Badge>
                        <Badge variant="info" appearance="soft">
                            RTL
                        </Badge>
                        <Badge variant="warning" appearance="soft">
                            Beta
                        </Badge>
                    </div>
                    <Button showArrow className="w-full">
                        Get started
                    </Button>
                </div>
            </FloatingCard>
            <FloatingCard
                {...card}
                depth={3}
                delay={0.6}
                className="start-10 top-48 w-60"
            >
                <Switch
                    label="Dark mode"
                    description="Follows your system"
                    defaultChecked
                    className="w-full"
                />
            </FloatingCard>
            <FloatingCard
                {...card}
                depth={1.5}
                delay={0.75}
                className="end-10 bottom-4 w-72"
            >
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                            {TEAM.map((initials) => (
                                <Avatar
                                    key={initials}
                                    fallback={initials}
                                    className="ring-2 ring-card"
                                />
                            ))}
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                            72%
                        </span>
                    </div>
                    <Progress value={72} />
                </div>
            </FloatingCard>
        </div>
    );
}

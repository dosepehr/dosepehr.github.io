'use client';

import Avatar from '@foundation/components/ui/Avatar';
import Badge from '@foundation/components/ui/Badge';
import Card from '@foundation/components/ui/Card';
import Progress from '@foundation/components/ui/Progress';
import Slider from '@foundation/components/ui/Slider';

const TEAM = ['SD', 'AK', 'MR'];

export default function ProjectCard() {
    return (
        <Card
            title="Website redesign"
            description="Sprint 4 of 6"
            action={<Badge variant="success">On track</Badge>}
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} />
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-sm text-muted-foreground">
                        Budget used
                    </span>
                    <Slider defaultValue={[40]} aria-label="Budget used" />
                </div>
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
                    <div className="flex gap-1.5">
                        <Badge variant="secondary">Design</Badge>
                        <Badge variant="info" appearance="soft">
                            Frontend
                        </Badge>
                    </div>
                </div>
            </div>
        </Card>
    );
}

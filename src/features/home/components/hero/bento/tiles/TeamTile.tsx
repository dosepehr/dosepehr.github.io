'use client';

import Avatar from '@foundation/components/ui/Avatar';
import Badge from '@foundation/components/ui/Badge';
import { useState } from 'react';
import BentoTile from '../BentoTile';
import { ROLES, TEAM } from '../bentoData';

// Click a role to cycle it.
export default function TeamTile({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    const [roles, setRoles] = useState(TEAM.map((member) => member.role));
    const cycle = (at: number) =>
        setRoles((current) =>
            current.map((role, i) =>
                i === at ? (role + 1) % ROLES.length : role,
            ),
        );

    return (
        <BentoTile
            title="Team"
            hint="Click a role"
            index={index}
            className={className}
        >
            <ul className="flex flex-col gap-3">
                {TEAM.map((member, i) => (
                    <li key={member.name} className="flex items-center gap-3">
                        <Avatar fallback={member.initials} size="sm" />
                        <span className="flex-1 truncate text-sm font-medium">
                            {member.name}
                        </span>
                        <button
                            type="button"
                            onClick={() => cycle(i)}
                            aria-label={`Change ${member.name}'s role`}
                        >
                            <Badge
                                variant={
                                    roles[i] === 0 ? 'default' : 'secondary'
                                }
                                appearance="soft"
                            >
                                {ROLES[roles[i]]}
                            </Badge>
                        </button>
                    </li>
                ))}
            </ul>
        </BentoTile>
    );
}

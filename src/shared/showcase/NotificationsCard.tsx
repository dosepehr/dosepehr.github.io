'use client';

import Card from '@foundation/components/ui/Card';
import Checkbox from '@foundation/components/ui/Checkbox';
import { FieldGroup } from '@foundation/components/ui/Field';
import Switch from '@foundation/components/ui/Switch';

export default function NotificationsCard() {
    return (
        <Card
            title="Notifications"
            description="Choose what you want to hear about."
        >
            <FieldGroup>
                <Switch
                    className="w-full"
                    label="Product updates"
                    description="News about features and releases."
                    defaultChecked
                />
                <Switch
                    className="w-full"
                    label="Security alerts"
                    description="Sign-ins from new devices."
                    defaultChecked
                />
                <Checkbox
                    className="w-full"
                    label="Also send a weekly email digest"
                />
            </FieldGroup>
        </Card>
    );
}

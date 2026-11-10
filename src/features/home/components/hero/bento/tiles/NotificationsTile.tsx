import { FieldGroup } from '@foundation/components/ui/Field';
import Switch from '@foundation/components/ui/Switch';
import BentoTile from '../BentoTile';
import { NOTIFICATION_SETTINGS } from '../bentoData';

export default function NotificationsTile({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    return (
        <BentoTile
            title="Notifications"
            hint="Switch"
            index={index}
            className={className}
        >
            <FieldGroup>
                {NOTIFICATION_SETTINGS.map((setting) => (
                    <Switch
                        key={setting.label}
                        className="w-full"
                        {...setting}
                    />
                ))}
            </FieldGroup>
        </BentoTile>
    );
}

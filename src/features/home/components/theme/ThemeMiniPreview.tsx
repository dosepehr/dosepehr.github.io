'use client';

import Alert from '@foundation/components/ui/Alert';
import Badge from '@foundation/components/ui/Badge';
import Button from '@foundation/components/ui/Button';
import Progress from '@foundation/components/ui/Progress';
import Slider from '@foundation/components/ui/Slider';
import Switch from '@foundation/components/ui/Switch';

// A strip of components that react to the selected theme.
export default function ThemeMiniPreview() {
    return (
        <div className="grid w-full max-w-4xl gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-3 rounded-2xl border bg-card p-5">
                <Button showArrow>Continue</Button>
                <Button variant="outline">Preview</Button>
                <div className="flex flex-wrap gap-1.5">
                    <Badge>New</Badge>
                    <Badge variant="secondary">Draft</Badge>
                    <Badge variant="info" appearance="soft">
                        Info
                    </Badge>
                </div>
            </div>
            <div className="flex flex-col gap-5 rounded-2xl border bg-card p-5">
                <Switch
                    label="Notifications"
                    defaultChecked
                    className="w-full"
                />
                <Slider defaultValue={[60]} aria-label="Volume" />
                <Progress value={60} />
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border bg-card p-5">
                <Alert variant="success" title="Saved">
                    Your theme is applied everywhere.
                </Alert>
                <Alert variant="info" title="Tip">
                    Open Themes for full control.
                </Alert>
            </div>
        </div>
    );
}

'use client';

import Alert from '@foundation/components/ui/Alert';
import Button from '@foundation/components/ui/Button';
import Card from '@foundation/components/ui/Card';
import Tabs, {
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@foundation/components/ui/Tabs';

export default function ActionsCard() {
    return (
        <Card title="Deployments" description="Ship from main to production.">
            <Tabs defaultValue="status">
                <TabsList>
                    <TabsTrigger value="status">Status</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>
                <TabsContent
                    value="status"
                    className="flex flex-col gap-3 pt-3"
                >
                    <Alert variant="success" title="Deployed">
                        Production is running build #482.
                    </Alert>
                    <Alert variant="warning" title="Pending review">
                        Two pull requests are waiting for approval.
                    </Alert>
                </TabsContent>
                <TabsContent
                    value="actions"
                    className="flex flex-wrap gap-2 pt-3"
                >
                    <Button>Deploy</Button>
                    <Button variant="secondary">Preview</Button>
                    <Button variant="outline">Logs</Button>
                    <Button variant="destructive">Roll back</Button>
                </TabsContent>
            </Tabs>
        </Card>
    );
}

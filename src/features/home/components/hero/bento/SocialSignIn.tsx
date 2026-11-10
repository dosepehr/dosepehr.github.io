import GithubIcon from '@/shared/ui/GithubIcon';
import Button from '@foundation/components/ui/Button';
import Separator from '@foundation/components/ui/Separator';
import { KeyRound } from 'lucide-react';

// One-click sign-in options above the email form, then an "or" divider.
export default function SocialSignIn() {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" type="button">
                    <GithubIcon className="size-4" /> GitHub
                </Button>
                <Button variant="outline" type="button">
                    <KeyRound /> Passkey
                </Button>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase">
                <Separator className="flex-1" />
                or
                <Separator className="flex-1" />
            </div>
        </div>
    );
}

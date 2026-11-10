import BentoTile from '../BentoTile';
import SignUpForm from '../SignUpForm';
import SocialSignIn from '../SocialSignIn';

export default function SignUpTile({
    index,
    className,
}: {
    index: number;
    className?: string;
}) {
    return (
        <BentoTile
            title="Create an account"
            hint="react-hook-form + zod"
            index={index}
            className={className}
        >
            <div className="flex flex-col gap-5">
                <p className="text-sm text-muted-foreground">
                    Enter your email below to create your account.
                </p>
                <SocialSignIn />
                <SignUpForm />
            </div>
        </BentoTile>
    );
}

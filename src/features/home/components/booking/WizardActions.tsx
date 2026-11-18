import Button from '@foundation/components/ui/Button';

interface WizardActionsProps {
    isFirst: boolean;
    isLast: boolean;
    onBack: () => void;
    onNext: () => void;
}

export default function WizardActions({
    isFirst,
    isLast,
    onBack,
    onNext,
}: WizardActionsProps) {
    return (
        <div className="flex justify-between gap-2">
            <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={isFirst}
            >
                Back
            </Button>
            {/* Distinct keys: reusing one element would flip the clicked
                Next into a submit button before its click finishes, and
                the form would submit straight from the second-last step. */}
            {isLast ? (
                <Button key="submit" type="submit" showArrow>
                    Confirm booking
                </Button>
            ) : (
                <Button key="next" type="button" onClick={onNext} showArrow>
                    Next
                </Button>
            )}
        </div>
    );
}

import { registryUrl } from '@/core/site';
import type { LucideIcon } from 'lucide-react';
import {
    Accessibility,
    Blocks,
    Code2,
    FlaskConical,
    FormInput,
    Languages,
    MessagesSquare,
    MoonStar,
    Palette,
    ShieldCheck,
    Smartphone,
    Table2,
} from 'lucide-react';

export interface Feature {
    title: string;
    description: string;
    Icon: LucideIcon;
    /** Takes two columns in the grid on large screens. */
    wide?: boolean;
}

export const FEATURES: Feature[] = [
    {
        title: 'Install with the shadcn CLI',
        description:
            'Every component, hook and utility is a registry item. Add one or all of them; the CLI copies the source into your project and you own it.',
        Icon: Blocks,
        wide: true,
    },
    {
        title: 'RTL-first',
        description:
            'Logical properties and a direction provider, so Persian and Arabic layouts mirror correctly.',
        Icon: Languages,
    },
    {
        title: 'Themeable tokens',
        description:
            'Every color and the radius are CSS variables, with presets and a live theme builder.',
        Icon: Palette,
    },
    {
        title: 'Dark mode',
        description:
            'Light and dark tokens for every component, switched with one class.',
        Icon: MoonStar,
    },
    {
        title: 'Forms, done once',
        description:
            'Fields with labels, errors and loading states, a 32px rhythm, and react-hook-form bindings for the complex inputs.',
        Icon: FormInput,
        wide: true,
    },
    {
        title: 'Accessible primitives',
        description:
            'Built on Radix UI and Base UI: focus management, keyboard support and ARIA included.',
        Icon: Accessibility,
    },
    {
        title: 'Data table',
        description:
            'TanStack Table with pagination, selection, filtering, a sticky header and empty states.',
        Icon: Table2,
    },
    {
        title: 'Chat UI',
        description:
            'Messages, bubbles, reactions, attachments and status markers for conversational apps.',
        Icon: MessagesSquare,
    },
    {
        title: 'Code blocks',
        description:
            'Line numbers, diffs, copy buttons and streaming Shiki highlighting without WASM.',
        Icon: Code2,
        wide: true,
    },
    {
        title: 'PWA-ready',
        description:
            'Install prompts, offline mutation sync and iOS splash screens.',
        Icon: Smartphone,
    },
    {
        title: 'Tested and documented',
        description:
            'Vitest unit tests for every component, Storybook stories for every state, and Playwright flows for the browser-only features.',
        Icon: FlaskConical,
        wide: true,
    },
    {
        title: 'Strict TypeScript',
        description:
            'Typed props, variants and hooks, with no `any` in the public API.',
        Icon: ShieldCheck,
    },
];

export const STEPS = [
    {
        title: 'Set up shadcn',
        description:
            'Creates components.json and the base styles, if your project has none yet.',
        code: 'npx shadcn@latest init',
        lang: 'bash',
    },
    {
        title: 'Add a component',
        description:
            'Copies the component, its dependencies and the packages it needs.',
        code: `npx shadcn@latest add ${registryUrl}/button.json`,
        lang: 'bash',
    },
    {
        title: 'Make it yours',
        description:
            'The source lives in your project. Import it, then change anything.',
        code: `import Button from '@/components/ui/Button';\n\n<Button showArrow>Get started</Button>`,
        lang: 'tsx',
    },
];

export const RTL_COPY = {
    ltr: {
        title: 'New message',
        body: 'Your order has shipped and is on its way.',
        action: 'Track order',
        dismiss: 'Later',
        badge: 'Shipped',
    },
    rtl: {
        title: 'پیام جدید',
        body: 'سفارش شما ارسال شد و در راه است.',
        action: 'پیگیری سفارش',
        dismiss: 'بعداً',
        badge: 'ارسال شد',
    },
} as const;

// "Less markup" comparison: the same button, hand-rolled vs the component.
export const TAILWIND_BUTTON = `<button
    type="button"
    className="group inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg
        bg-blue-600 px-4 text-sm font-medium whitespace-nowrap text-white shadow-xs
        outline-none transition-all hover:bg-blue-700 focus-visible:ring-3
        focus-visible:ring-blue-600/50 disabled:pointer-events-none disabled:opacity-50
        dark:bg-blue-500 dark:hover:bg-blue-400 rtl:flex-row-reverse"
>
    Get started
    <svg className="size-4 transition-transform group-hover:translate-x-0.5
        rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
</button>`;

export const COMPONENT_BUTTON = `import Button from '@/components/ui/Button';

<Button showArrow>Get started</Button>`;

// The AI chat demo: the question, and the code the "assistant" streams back.
export const CHAT_QUESTION = 'Make me a pricing card with a highlighted plan.';

export const CHAT_ANSWER_CODE = `import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export function PricingCard() {
    return (
        <Card title="Pro" description="For growing teams" action={<Badge>Popular</Badge>}>
            <p className="text-3xl font-bold">$19</p>
            <Button showArrow className="w-full">
                Upgrade
            </Button>
        </Card>
    );
}`;

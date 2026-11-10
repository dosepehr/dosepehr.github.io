import summary from '@/generated/summary.json';
import {
    Database,
    Layers,
    LayoutGrid,
    Palette,
    Smartphone,
    SquarePen,
    type LucideIcon,
} from 'lucide-react';

export type LayerId = 'theme' | 'ui' | 'forms' | 'data' | 'state' | 'shell';

export interface Layer {
    id: LayerId;
    name: string;
    tagline: string;
    Icon: LucideIcon;
    /** What ships in this layer, as registry item or file names. */
    items: string[];
    /** One registry item to install as a sample. */
    install: string;
}

const groups = Object.entries(summary.byGroup).map(
    ([group, count]) => `${group} (${count})`,
);

// The library's layers from the bottom up: everything an app needs, not just
// the components.
export const LAYERS: Layer[] = [
    {
        id: 'theme',
        name: 'Theme',
        tagline: 'CSS-variable tokens, dark mode and RTL',
        Icon: Palette,
        items: ['theme tokens', 'dark mode', 'logical properties', 'direction'],
        install: 'theme',
    },
    {
        id: 'ui',
        name: 'Components',
        tagline: `${summary.byCategory.components} accessible primitives`,
        Icon: LayoutGrid,
        items: groups,
        install: 'button',
    },
    {
        id: 'forms',
        name: 'Form fields',
        tagline: `${summary.byCategory.form} controlled fields for react-hook-form + zod`,
        Icon: SquarePen,
        items: [
            'ControlledComboBox',
            'ControlledDatePicker',
            'ControlledOtpInput',
            'ControlledMultiInput',
            'Field / FieldGroup',
        ],
        install: 'controlled-combo-box',
    },
    {
        id: 'data',
        name: 'Data layer',
        tagline: 'A typed HTTP client and React Query hooks',
        Icon: Database,
        items: [
            'httpService',
            'refresh-token interceptor',
            'global error handler',
            'mapErrorToToast',
            'useCustomQuery',
            'useCustomMutation',
            'useCustomSuspenseQuery',
        ],
        install: 'use-custom-query',
    },
    {
        id: 'state',
        name: 'State & config',
        tagline: 'Zustand stores and a validated env',
        Icon: Layers,
        items: [
            'createStore',
            'env (zod-validated)',
            'useOptions',
            'useIsMobile',
        ],
        install: 'create-store',
    },
    {
        id: 'shell',
        name: 'App shell',
        tagline: 'Providers, PWA and offline sync',
        Icon: Smartphone,
        items: [...summary.providers, 'PWAInstall', 'useNotification'],
        install: 'react-query-provider',
    },
];

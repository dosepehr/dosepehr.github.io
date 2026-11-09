import ThemesPage from '@/features/themes/ThemesPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Themes',
    description:
        'Customize the colors and radius of every Frontend Foundation component.',
};

export default function Page() {
    return <ThemesPage />;
}

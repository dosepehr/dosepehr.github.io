// Content for the bento hero's tiles.

export const OTP_CODE = '482913';

export const BENTO_CHAT = [
    { from: 'them', text: 'Does it work in Persian?' },
    { from: 'me', text: 'Every component, one dir prop.' },
    { from: 'them', text: 'And dark mode?' },
    { from: 'me', text: 'Built in. Try the switch next door.' },
] as const;

export const TRACK = {
    title: 'Midnight Commit',
    artist: 'The Linters',
    seconds: 214,
};

export interface Player {
    name: string;
    country: string;
    score: number;
}

export const LEADERBOARD: Player[] = [
    { name: 'Sara', country: 'IR', score: 982 },
    { name: 'Liam', country: 'UK', score: 1240 },
    { name: 'Noor', country: 'AE', score: 1105 },
    { name: 'Mia', country: 'CN', score: 876 },
];

export type SortKey = keyof Player;

export const NOTIFICATION_SETTINGS = [
    {
        label: 'Product updates',
        description: 'Features and releases',
        defaultChecked: true,
    },
    {
        label: 'Security alerts',
        description: 'New sign-ins',
        defaultChecked: true,
    },
    {
        label: 'Weekly digest',
        description: 'A summary every Monday',
        defaultChecked: false,
    },
];

// Steps per day over the last week, for the goal tile's bars.
export const GOAL_HISTORY = [6200, 8100, 7400, 9800, 5600, 10400, 8800];

export const ROLES = ['Owner', 'Editor', 'Viewer'] as const;

export const TEAM = [
    { initials: 'SD', name: 'Sepehr D.', role: 0 },
    { initials: 'NK', name: 'Nora K.', role: 1 },
    { initials: 'AM', name: 'Arash M.', role: 2 },
];

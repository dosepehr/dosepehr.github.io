// Content for the booking wizard section.

export const BOOKING_STEPS = [
    { title: 'Stay', description: 'Dates and guests' },
    { title: 'Guest', description: 'Who is coming' },
    { title: 'Extras', description: 'Budget and add-ons' },
];

export const ROOM_OPTIONS = [
    { value: 'garden', label: 'Garden room' },
    { value: 'deluxe', label: 'Deluxe king' },
    { value: 'suite', label: 'Rooftop suite' },
];

export const EXTRA_OPTIONS = [
    {
        value: 'dining',
        label: 'Dining',
        children: [
            { value: 'breakfast', label: 'Breakfast' },
            { value: 'dinner', label: 'Dinner' },
        ],
    },
    {
        value: 'wellness',
        label: 'Wellness',
        children: [
            { value: 'spa', label: 'Spa access' },
            { value: 'gym', label: 'Gym' },
        ],
    },
    {
        value: 'transport',
        label: 'Transport',
        children: [
            { value: 'pickup', label: 'Airport pickup' },
            { value: 'parking', label: 'Parking' },
        ],
    },
];

// The components the wizard is built from, linked to their docs pages.
export const BOOKING_PARTS = [
    { name: 'Stepper', href: '/docs/components/stepper' },
    {
        name: 'Date Range Picker',
        href: '/docs/form/controlled-date-range-picker',
    },
    { name: 'Time Picker', href: '/docs/form/controlled-time-picker' },
    { name: 'Number Input', href: '/docs/form/controlled-number-input' },
    { name: 'Mobile Input', href: '/docs/form/controlled-mobile-input' },
    { name: 'Select', href: '/docs/form/controlled-select' },
    { name: 'Tree Select', href: '/docs/form/controlled-tree-select' },
    { name: 'Price Input', href: '/docs/form/controlled-price-input' },
    { name: 'Switch', href: '/docs/form/controlled-switch' },
    { name: 'Rating', href: '/docs/components/rating' },
];

'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

// Animations follow the OS "reduce motion" setting.
export default function MotionProvider({ children }: { children: ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

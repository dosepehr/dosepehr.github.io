import { createContext } from 'react';
import type { Args } from '../types';

// Live args for the story being rendered, read by composed story components.
export const ArgsContext = createContext<Args>({});

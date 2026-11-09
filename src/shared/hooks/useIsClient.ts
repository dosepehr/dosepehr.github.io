import { useSyncExternalStore } from 'react';

const noop = () => {};
const subscribe = () => noop;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

// true after hydration, false during the static (server) render.
export function useIsClient() {
    return useSyncExternalStore(
        subscribe,
        getClientSnapshot,
        getServerSnapshot,
    );
}

// Stand-in for `storybook/test`, aliased in next.config.mjs and tsconfig.json.
// Some foundation stories import it for their `play` interaction tests. The
// docs only render stories and never run `play`, so Storybook isn't installed
// and these exports just keep those imports resolvable.

type Play = (...args: never[]) => never;

const notAvailable: Play = () => {
    throw new Error('storybook/test is not available in the docs site');
};

export const expect = notAvailable as unknown as (
    actual: unknown,
) => Record<string, (...args: unknown[]) => unknown>;
export const userEvent = new Proxy({}, { get: () => notAvailable }) as Record<
    string,
    (...args: unknown[]) => Promise<void>
>;
export const waitFor = notAvailable as unknown as (
    callback: () => unknown,
    options?: unknown,
) => Promise<void>;
// Mirrors the Testing Library query families by name, so stories can chain
// on `findAllBy*(...)` promises and index `*AllBy*` arrays.
type Query<T> = (...args: unknown[]) => T;
type BoundQueries = {
    [K in `getBy${string}` | `queryBy${string}`]: Query<HTMLElement>;
} & {
    [K in `getAllBy${string}` | `queryAllBy${string}`]: Query<HTMLElement[]>;
} & {
    [K in `findBy${string}`]: Query<Promise<HTMLElement>>;
} & {
    [K in `findAllBy${string}`]: Query<Promise<HTMLElement[]>>;
};

export const within = notAvailable as unknown as (
    element: HTMLElement,
) => BoundQueries;

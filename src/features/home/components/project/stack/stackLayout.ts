export interface StackSpacing {
    /** Distance between resting layers. */
    gap: number;
    /** Extra lift for the layers above the active one, to uncover it. */
    spread: number;
    /** How far the active layer rises out of its slot. */
    lift: number;
}

export const STACK_SPACING: Record<'regular' | 'compact', StackSpacing> = {
    regular: { gap: 30, spread: 130, lift: 14 },
    compact: { gap: 18, spread: 80, lift: 8 },
};

// Where a slab sits and how strongly it shows, given the active layer.
export function slabPlacement(
    level: number,
    active: number,
    spacing: StackSpacing,
) {
    const above = level > active;
    return {
        z:
            level * spacing.gap +
            (above ? spacing.spread : 0) +
            (level === active ? spacing.lift : 0),
        opacity: above ? 0.3 : level === active ? 1 : 0.75,
    };
}

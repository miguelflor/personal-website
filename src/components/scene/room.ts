// Shared room geometry. Both the walls and anything that needs to sit against
// them (e.g. the desk) derive their placement from these values, so the room
// stays consistent from a single source of truth.

export const FLOOR_SIZE = 5;
export const WALL_HEIGHT = 2;
export const WALL_THICKNESS = 0.05;
export const WALL_SAFE_OFFSET = 0.03;

/**
 * Distance from the room's center to the inner face of a perimeter wall.
 * This is the surface objects lean against, not the wall's center.
 */
export const WALL_INNER_OFFSET = FLOOR_SIZE / 2 - WALL_SAFE_OFFSET;

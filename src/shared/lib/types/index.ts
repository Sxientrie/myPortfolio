/**
 * @file: src/shared/lib/types/index.ts
 *
 * @description: Defines shared TypeScript types and interfaces for the application.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This file is a humble abode for shared TypeScript types. Right now, its only resident is
 * `AnimState`, a union type that defines the valid states for our chat panel's animation state
 * machine. It's not much, but it's an honest living, ensuring that we don't accidentally try to
 * set the animation state to "wobbling" or "on fire". It's a small but vital piece of type safety.
 *
 * @dependencies:
 * ➥ None
 *
 * @outputs:
 * ➥ AnimState (type)
 */
export type AnimState = 'idle' | 'opening' | 'closing' | 'open';

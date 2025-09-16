/**
 * @file: index.tsx
 * @description: Application entry point shim for the AI Studio environment.
 * @module: App.Bootstrap
 *
 * @overview:
 * This file serves as the primary entry point required by the hosting environment.
 * Its only responsibility is to import the main application bootstrap file,
 * located at `src/app/main.tsx`, which then handles the actual rendering of the
 * React application. This approach maintains a clean project structure within
 * the `src` directory while satisfying the platform's entry point requirements.
 *
 * @dependencies:
 * ➥ src/app/main.tsx
 *
 * @outputs:
 * ➥ Executes the main application script.
 */
import "./src/app/main.tsx";

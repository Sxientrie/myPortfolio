/**
 * @file: src/app/main.tsx
 *
 * @description: The application's main entry point, responsible for bootstrapping the React ecosystem.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This script is the primordial ooze from which the entire application springs to life. Its sole,
 * thankless job is to find the `#root` div in the `index.html` file—a task of surprising
 * fragility—and inject the main `<App />` component into it. It wraps the whole thing in
 * `<React.StrictMode>` as a token gesture to best practices, hoping to catch problems before they
 * fester into full-blown digital plagues. It's the first domino to fall in a long, complex chain
 * of events that ultimately renders the UI. No pressure.
 *
 * @dependencies:
 * ➥ react
 * ➥ react-dom/client
 * ➥ src/app/App.tsx
 *
 * @outputs:
 * ➥ None
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App.tsx';

const container = document.getElementById('root');

if (!container) {
	throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(container);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

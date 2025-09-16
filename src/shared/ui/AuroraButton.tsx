/**
 * @file: src/shared/ui/AuroraButton.tsx
 *
 * @description: A reusable button component with a fancy, animated aurora borealis-style border.
 *
 * @module: Shared.UI
 *
 * @overview:
 * This is the `AuroraButton`. It's not just any button; it's a statement piece. It's a standard
 * `<button>` element that's been given a serious cosmetic upgrade via some clever CSS trickery
 * defined in `GlobalStyles.tsx`. The magic lies in a conic-gradient background on a pseudo-element
 * that's perpetually spinning, creating a shimmering, aurora-like effect around the button's
 * border. It's designed to be a "call-to-action" that's hard to ignore.
 *
 * Architecturally, it's a simple, presentational component. It accepts all the standard button
 * props (`type`, `onClick`, `disabled`, etc.) and passes them along, making it a drop-in
 * replacement for a regular button. It's memoized because, like all good-looking things, it
 * shouldn't have to re-render unless absolutely necessary.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ AuroraButton (component)
 */
import type React from 'react';
import { memo } from 'react';

type AuroraButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AuroraButton = memo(
	({
		children,
		className = '',
		...props
	}: AuroraButtonProps): React.ReactElement => {
		return (
			<button
				className={`aurora-button relative overflow-hidden rounded-lg px-8 py-3 text-sm font-medium tracking-widest uppercase text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
				{...props}
			>
				<span className="aurora-button-mask absolute inset-px bg-[oklch(10%_0.02_265)] rounded-[6px] transition-colors duration-300"></span>
				<span className="relative">{children}</span>
			</button>
		);
	},
);

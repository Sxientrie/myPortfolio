/**
 * @file: src/shared/ui/AnimatedLogo.tsx
 *
 * @description: Renders the site's animated logo, a set of perpetually pulsing concentric circles.
 *
 * @module: Shared.UI
 *
 * @overview:
 * This is the `AnimatedLogo`. It's a simple, self-contained component whose only reason for
 * existence is to render the site's logo. The logo itself is an inline SVG composed of three
 * concentric circles, which are given a semblance of life by a CSS animation that makes them
 * gently pulse. To add a dash of unnecessary sophistication, the whole thing is tilted in 3D space
 * using CSS transforms, because a flat logo is just too boring for this world. It's a purely
 * decorative, stateless component that takes no props. It's memoized, of course, because we
 * wouldn't want to re-render our own logo every time something else on the page changes. That
 * would be absurd.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ AnimatedLogo (component)
 */
import type React from 'react';
import { memo } from 'react';

interface AnimatedLogoProps {
	className?: string;
}

export const AnimatedLogo = memo(
	({ className = 'w-8 h-8' }: AnimatedLogoProps): React.ReactElement => (
		<div
			className={`${className} flex-shrink-0`}
			style={{ perspective: '500px', transformStyle: 'preserve-3d' }}
		>
			<svg
				viewBox="0 0 48 48"
				className="w-full h-full overflow-visible"
				style={{ transform: 'rotateX(-15deg) rotateY(10deg)' }}
			>
				<g
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				>
					<circle
						className="animate-pulse-3d"
						cx="24"
						cy="24"
						r="6"
						style={{ animationDelay: '0.5s' }}
					></circle>
					<circle
						className="animate-pulse-3d"
						cx="24"
						cy="24"
						r="14"
						style={{ animationDelay: '0.25s' }}
					></circle>
					<circle className="animate-pulse-3d" cx="24" cy="24" r="22"></circle>
				</g>
			</svg>
		</div>
	),
);
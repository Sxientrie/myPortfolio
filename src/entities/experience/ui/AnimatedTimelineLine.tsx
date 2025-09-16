/**
 * @file: src/entities/experience/ui/AnimatedTimelineLine.tsx
 *
 * @description: A component that renders a vertical line which animates its own drawing progress as
 *               the user scrolls.
 *
 * @module: Shared.UI
 *
 * @overview:
 * This component is all about visual flair. Its one and only job is to render a vertical line that
 * appears to draw itself as the user scrolls down its parent container. It's a key part of the
 * timeline effect, providing a visual thread that connects different points in time.
 *
 * Architecturally, this component is a shining example of offloading the heavy lifting. It doesn't
 * contain any animation logic itself. Instead, it puts the `useScrollProgress` hook to work. It
 * passes the hook a ref to its container and a ref to its own progress bar element, and the hook
 * takes care of the rest, updating the `scale-y` transform based on scroll progress. The
 * component also employs a rather nifty SVG filter to give the line a textured, "brush stroke"
 * appearance, because a perfectly straight, boring line just wouldn't be dramatic enough. It's a
 * purely presentational component, a puppet whose strings are pulled by a custom hook.
 *
 * @dependencies:
 * ➥ react
 * ➥ ../../../shared/lib/hooks/useScrollProgress.tsx
 *
 * @outputs:
 * ➥ AnimatedTimelineLine (component)
 */
import type React from 'react';
import { memo, useRef } from 'react';

import { useScrollProgress } from '../../../shared/lib/hooks/useScrollProgress.tsx';

interface AnimatedTimelineLineProps {
	containerRef: React.RefObject<HTMLElement>;
	className?: string;
}

export const AnimatedTimelineLine = memo(
	({
		containerRef,
		className = '',
	}: AnimatedTimelineLineProps): React.ReactElement => {
		const progressRef = useRef<HTMLDivElement>(null);
		useScrollProgress(containerRef, progressRef);

		return (
			<div
				className={`absolute top-0 bottom-0 w-[3.75px] bg-[oklch(100%_0_0_/_0.1)] ${className}`}
				style={{ filter: 'url(#brush-stroke)' }}
			>
				<div
					ref={progressRef}
					className="timeline-progress-bar relative w-full h-full bg-[var(--color-aurora-primary)] origin-top transform scale-y-0"
				/>
			</div>
		);
	},
);
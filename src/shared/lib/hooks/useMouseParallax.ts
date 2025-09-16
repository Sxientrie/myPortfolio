/**
 * @file: src/shared/lib/hooks/useMouseParallax.ts
 *
 * @description: A hook that applies a subtle 3D parallax effect to an element based on mouse position.
 *
 * @module: Shared.UI
 *
 * @overview:
 * This hook, `useMouseParallax`, is a testament to the idea that sometimes, you just need to make
 * things move a little. It attaches itself to a DOM element via a ref and then proceeds to spy on
 * the user's mouse movements. When the mouse hovers over the element, it calculates the cursor's
 * position relative to the element's center. These coordinates are then mercilessly mapped to
 * `rotateX` and `rotateY` values, creating a subtle 3D tilt effect.
 *
 * To avoid the jank that would otherwise ensue, it wisely uses `requestAnimationFrame` to update
 * the element's transform style, ensuring the animation is as smooth as my third cup of coffee.
 * When the mouse, inevitably, leaves the element, the hook gracefully resets the transform,
 * adding a transition to make sure it doesn't just snap back like a broken rubber band. It's a
 * simple, elegant solution for adding a touch of life to otherwise static components.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ useMouseParallax
 */

import { useState, useEffect, useRef } from 'react';
import type React from 'react';

const MAX_ROTATION = 8; // Max rotation in degrees

export const useMouseParallax = (
	ref: React.RefObject<HTMLElement>,
): React.CSSProperties => {
	const [style, setStyle] = useState<React.CSSProperties>({});
	const animationFrameId = useRef<number | null>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) {
			return;
		}

		const onMouseMove = (event: MouseEvent): void => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}

			animationFrameId.current = requestAnimationFrame(() => {
				const { clientX, clientY } = event;
				const { left, top, width, height } = element.getBoundingClientRect();

				const mouseX = clientX - left;
				const mouseY = clientY - top;

				const rotateY = (mouseX / width - 0.5) * 2 * MAX_ROTATION;
				const rotateX = (0.5 - mouseY / height) * 2 * MAX_ROTATION;

				setStyle({
					transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
					transition: 'transform 0.1s ease-out',
				});
			});
		};

		const onMouseLeave = (): void => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}

			animationFrameId.current = requestAnimationFrame(() => {
				setStyle({
					transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
					transition: 'transform 0.4s ease-in-out',
				});
			});
		};

		element.addEventListener('mousemove', onMouseMove);
		element.addEventListener('mouseleave', onMouseLeave);

		return () => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
			element.removeEventListener('mousemove', onMouseMove);
			element.removeEventListener('mouseleave', onMouseLeave);
		};
	}, [ref]);

	return style;
};

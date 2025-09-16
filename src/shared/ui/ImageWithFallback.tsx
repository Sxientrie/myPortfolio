/**
 * @file: src/shared/ui/ImageWithFallback.tsx
 *
 * @description: A component that gracefully handles image loading errors by displaying a styled placeholder.
 *
 * @module: Shared.UI
 *
 * @overview:
 * This is the `ImageWithFallback` component, a resilient little trooper that refuses to show a
 * broken image icon. Its job is to wrap a standard `<img>` or `<picture>` element and monitor
 * for loading errors. If an image `src` is missing or fails to load, it seamlessly swaps the
 * would-be broken image with a clean, aesthetically-pleasing placeholder, ensuring the UI
 * never looks broken. It's a simple, yet crucial, piece of defensive UI design. It supports
 * `<picture>` elements by accepting `<source>` tags as children.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ ImageWithFallback (component)
 */
import type React from 'react';
import { memo, useState } from 'react';

interface ImageWithFallbackProps
	extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'children'> {
	fallbackText?: string;
	children?: React.ReactNode; // For <source> elements
}

const Placeholder = ({ fallbackText }: { fallbackText?: string }) => (
	<div className="flex w-full h-full items-center justify-center bg-[oklch(6%_0.02_265)] text-[oklch(95%_0_0_/_0.3)]">
		<div className="flex flex-col items-center gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="opacity-50 w-8 h-8"
			>
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
				<circle cx="8.5" cy="8.5" r="1.5"></circle>
				<polyline points="21 15 16 10 5 21"></polyline>
			</svg>
			<span className="text-xs font-light tracking-wider">{fallbackText}</span>
		</div>
	</div>
);

export const ImageWithFallback = memo(
	({
		src,
		alt,
		className,
		fallbackText = 'Image',
		children,
		...props
	}: ImageWithFallbackProps): React.ReactElement => {
		const [hasError, setHasError] = useState(!src);

		if (hasError) {
			return <Placeholder fallbackText={fallbackText} />;
		}

		if (children) {
			return (
				<picture>
					{children}
					<img
						src={src}
						alt={alt}
						onError={() => setHasError(true)}
						className={className}
						{...props}
					/>
				</picture>
			);
		}

		return (
			<img
				src={src}
				alt={alt}
				onError={() => setHasError(true)}
				className={className}
				{...props}
			/>
		);
	},
);
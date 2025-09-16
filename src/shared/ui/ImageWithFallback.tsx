import type React from "react";
import { memo, useState, useEffect, useMemo } from "react";
import { useInView } from "../lib/hooks/useInView";

interface ImageWithFallbackProps
	extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "children"> {
	fallbackText?: string;
	children?: React.ReactNode;
}

const Placeholder = ({ fallbackText }: { fallbackText?: string }) => (
	<div className="absolute inset-0 flex w-full h-full items-center justify-center bg-[oklch(6%_0.02_265)] text-[oklch(95%_0_0_/_0.3)]">
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
		fallbackText = "Image",
		children,
		...props
	}: ImageWithFallbackProps): React.ReactElement => {
		const inViewOptions = useMemo(() => ({ rootMargin: "200px" }), []);
		const [ref, isIntersecting] = useInView<HTMLDivElement>(inViewOptions);
		const [hasError, setHasError] = useState(!src);
		const [isLoaded, setLoaded] = useState(false);

		useEffect(() => {
			if (src) {
				setHasError(false);
			}
			setLoaded(false);
		}, [src]);

		const showError = hasError || (!src && isIntersecting);
		const effectiveSrc = isIntersecting ? src : undefined;
        const effectiveChildren = isIntersecting ? children : undefined;

		return (
			<div ref={ref} className="relative w-full h-full">
				{/* Image container for opacity transition */}
				{!showError && (
					<div
						className="transition-opacity duration-300 w-full h-full"
						style={{ opacity: isLoaded ? 1 : 0 }}
					>
						{children ? (
							<picture>
								{effectiveChildren}
								<img
									src={effectiveSrc}
									alt={alt}
									className={className}
									onLoad={() => setLoaded(true)}
									onError={() => setHasError(true)}
									{...props}
								/>
							</picture>
						) : (
							<img
								src={effectiveSrc}
								alt={alt}
								className={className}
								onLoad={() => setLoaded(true)}
								onError={() => setHasError(true)}
								{...props}
							/>
						)}
					</div>
				)}

				{/* Placeholder, fades out */}
				<div
					className="transition-opacity duration-300"
					style={{ opacity: !isLoaded || showError ? 1 : 0 }}
				>
					<Placeholder fallbackText={fallbackText} />
				</div>
			</div>
		);
	},
);

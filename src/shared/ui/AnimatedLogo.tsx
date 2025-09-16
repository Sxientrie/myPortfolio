import type React from "react";
import { memo } from "react";
interface AnimatedLogoProps {
	className?: string;
}
export const AnimatedLogo = memo(
	({ className = "w-8 h-8" }: AnimatedLogoProps): React.ReactElement => (
		<div
			className={`${className} flex-shrink-0`}
			style={{ perspective: "500px", transformStyle: "preserve-3d" }}
		>
			<svg
				viewBox="0 0 48 48"
				className="w-full h-full overflow-visible"
				style={{ transform: "rotateX(-15deg) rotateY(10deg)" }}
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
						style={{ animationDelay: "0.5s" }}
					></circle>
					<circle
						className="animate-pulse-3d"
						cx="24"
						cy="24"
						r="14"
						style={{ animationDelay: "0.25s" }}
					></circle>
					<circle className="animate-pulse-3d" cx="24" cy="24" r="22"></circle>
				</g>
			</svg>
		</div>
	),
);

import type React from "react";
import { memo, useRef } from "react";
import { useScrollProgress } from "../../../shared/lib/hooks/useScrollProgress.tsx";
interface AnimatedTimelineLineProps {
	containerRef: React.RefObject<HTMLElement>;
	className?: string;
}
export const AnimatedTimelineLine = memo(
	({
		containerRef,
		className = "",
	}: AnimatedTimelineLineProps): React.ReactElement => {
		const progressRef = useRef<HTMLDivElement>(null);
		useScrollProgress(containerRef, progressRef);
		return (
			<div
				className={`absolute top-0 bottom-0 w-[3.75px] bg-[oklch(100%_0_0_/_0.1)] ${className}`}
				style={{ filter: "url(#brush-stroke)" }}
			>
				<div
					ref={progressRef}
					className="timeline-progress-bar relative w-full h-full bg-[var(--color-aurora-primary)] origin-top transform scale-y-0"
				/>
			</div>
		);
	},
);

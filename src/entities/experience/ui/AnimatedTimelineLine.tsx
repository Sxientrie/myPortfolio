import { motion, useScroll } from "framer-motion";
import type React from "react";
import { memo } from "react";

interface AnimatedTimelineLineProps {
	containerRef: React.RefObject<HTMLElement>;
	className?: string;
}

export const AnimatedTimelineLine = memo(
	({
		containerRef,
		className = "",
	}: AnimatedTimelineLineProps): React.ReactElement => {
		const { scrollYProgress } = useScroll({
			target: containerRef,
			offset: ["start center", "end center"],
		});

		return (
			<div
				className={`absolute top-0 bottom-0 w-[3.75px] bg-[oklch(100%_0_0_/_0.1)] ${className}`}
				style={{ filter: "url(#brush-stroke)" }}
			>
				<motion.div
					className="timeline-progress-bar relative w-full h-full bg-[var(--color-aurora-primary)] origin-top"
					style={{ scaleY: scrollYProgress }}
				/>
			</div>
		);
	},
);

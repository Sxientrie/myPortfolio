/**
 * @file: src/entities/experience/ui/TimelineItem.tsx
 *
 * @description: Renders a single entry in the professional experience timeline, complete with a
 *               scroll-triggered fade-in animation.
 *
 * @module: Shared.UI
 *
 * @overview:
 * This is the `TimelineItem`, a component that represents a single, glorious moment in a
 * professional career. Its job is to display a job title, company, date, and description in a neat
 * little package. It's designed to be versatile, happily rendering itself on either the left or
 * the right of a central timeline on desktop, and then dutifully stacking into a single column on
 * mobile, because responsive design is a non-negotiable pact we've all made.
 *
 * Architecturally, it's another component that knows better than to handle its own complex logic.
 * It uses the `useScrollAnimation` hook to achieve a subtle fade-and-slide-in effect as it enters
 * the viewport. A new `TimelineIcon` sub-component is introduced, which takes its cues from the
 * `useIconFillAnimation` hook to create a "color fill" effect as the timeline scrolls past. The
 * actual text content is neatly bundled into a separate `CardContent` component, a fine example
 * of not putting all your JSX in one basket.
 *
 * @dependencies:
 * ➥ react
 * ➥ ../../../shared/lib/hooks/useScrollAnimation.tsx
 * ➥ ../../../shared/lib/hooks/useIconFillAnimation.ts
 * ➥ ../../../shared/lib/data/icons.ts
 *
 * @outputs:
 * ➥ TimelineItem (component)
 */
import type React from 'react';
import { memo, useRef } from 'react';

import { icons } from '../../../shared/lib/data/icons.ts';
import { useIconFillAnimation } from '../../../shared/lib/hooks/useIconFillAnimation.ts';
import { useScrollAnimation } from '../../../shared/lib/hooks/useScrollAnimation.tsx';

interface TimelineItemProps {
	item: {
		date: string;
		title: string;
		company: string;
		description: string;
		iconKey: keyof typeof icons;
	};
	isLeft: boolean;
}

interface TimelineIconProps {
	iconKey: keyof typeof icons;
}

const TimelineIcon = memo(({ iconKey }: TimelineIconProps) => {
	const gradientRef = useRef<SVGLinearGradientElement>(null);
	useIconFillAnimation(gradientRef);

	const iconMarkup = icons[iconKey];
	const gradientId = `icon-grad-${iconKey}`;

	return (
		<div className="w-12 h-12 flex items-center justify-center relative">
			<svg
				className="w-full h-full overflow-visible absolute"
				viewBox="0 0 48 48"
			>
				<defs>
					{/* Replaced radialGradient with linearGradient for a top-to-bottom fill effect */}
					<linearGradient
						ref={gradientRef}
						id={gradientId}
						x1="0"
						y1="0"
						x2="0"
						y2="1"
					>
						<stop offset="0%" stopColor="var(--color-aurora-primary)" />
						<stop offset="0%" stopColor="oklch(100% 0 0 / 0.1)" />
					</linearGradient>
				</defs>
				{/* Opaque background circle to mask the timeline stroke */}
				<circle cx="24" cy="24" r="23" fill="oklch(5% 0 0 / 0.85)" />
				<circle
					cx="24"
					cy="24"
					r="22"
					fill={`url(#${gradientId})`}
					filter="url(#brush-stroke)"
				/>
				<circle
					cx="24"
					cy="24"
					r="16"
					fill="oklch(5% 0 0 / 0.85)"
					stroke="oklch(100% 0 0 / 0.05)"
					strokeWidth="0.5"
				/>
			</svg>
			<div
				className="absolute w-6 h-6 text-white"
				dangerouslySetInnerHTML={{ __html: iconMarkup }}
			/>
		</div>
	);
});

const PlaceholderImage = memo(() => (
	<div className="aspect-video w-full rounded-lg bg-[oklch(8%_0.02_265)] border border-[oklch(20%_0.02_288)] mb-4 inline-block"></div>
));

const CardContent = memo(({ item }: { item: TimelineItemProps['item'] }) => (
	<div className="inline-block">
		<p className="uppercase tracking-widest text-xs text-[oklch(95%_0_0_/_0.5)] mb-3 font-normal">
			{item.date}
		</p>
		<h3 className="text-lg font-medium text-white">{item.title}</h3>
		<p className="text-base text-[oklch(95%_0_0_/_0.7)] my-1">{item.company}</p>
		<p className="text-sm text-[oklch(95%_0_0_/_0.7)] leading-relaxed font-light mt-2 mb-0">
			{item.description}
		</p>
	</div>
));

export const TimelineItem = memo(
	({ item, isLeft }: TimelineItemProps): React.ReactElement => {
		const setScrollRef = useScrollAnimation();

		return (
			<div
				ref={setScrollRef}
				className="relative opacity-0 translate-y-5 transition-all duration-700 ease-out"
			>
				<div className="absolute top-4 left-6 md:left-1/2 -translate-x-1/2">
					<TimelineIcon iconKey={item.iconKey} />
				</div>
				{/* Desktop view: A two-column grid where the content appears on the left or right */}
				<div className="hidden md:grid md:grid-cols-2">
					{isLeft ? (
						<>
							<div className="col-start-1 pr-12 text-right">
								<CardContent item={item} />
							</div>
							<div className="col-start-2 pl-12 text-left">
								<PlaceholderImage />
							</div>
						</>
					) : (
						<>
							<div className="col-start-1 pr-12 text-right">
								<PlaceholderImage />
							</div>
							<div className="col-start-2 pl-12 text-left">
								<CardContent item={item} />
							</div>
						</>
					)}
				</div>

				{/* Mobile view: A single column with content offset to the right of the timeline */}
				<div className="md:hidden pl-20 relative pb-4">
					<PlaceholderImage />
					<CardContent item={item} />
				</div>
			</div>
		);
	},
);
import type React from "react";
import { memo } from "react";
import { ImageWithFallback } from "../../../shared/ui/ImageWithFallback.tsx";
interface TestimonialCardProps {
	testimonial: {
		quote: string;
		author: {
			name: string;
			title: string;
			image: string;
		};
	};
}
export const TestimonialCard = memo(
	({ testimonial }: TestimonialCardProps): React.ReactElement => {
		return (
			<div className="flex-shrink-0 w-full p-8 text-center">
				<blockquote className="text-base font-light leading-relaxed max-w-[70ch] mx-auto mb-8 text-[oklch(95%_0_0_/_0.7)]">
					"{testimonial.quote}"
				</blockquote>
				<figure className="flex flex-col items-center gap-2">
					<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[oklch(100%_0_0_/_0.1)] flex-shrink-0">
						<ImageWithFallback
							src={testimonial.author.image}
							alt={`Portrait of ${testimonial.author.name}, who provided a testimonial.`}
							className="w-full h-full object-cover"
							fallbackText={testimonial.author.name}
						/>
					</div>
					<figcaption>
						<div className="font-medium text-white">
							{testimonial.author.name}
						</div>
						<div className="text-sm text-[oklch(95%_0_0_/_0.5)]">
							{testimonial.author.title}
						</div>
					</figcaption>
				</figure>
			</div>
		);
	},
);

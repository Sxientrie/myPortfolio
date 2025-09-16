/**
 * @file: src/entities/testimonial/ui/TestimonialCard.tsx
 *
 * @description: A component that displays a single testimonial, including a quote and author
 *               attribution.
 *
 * @module: Shared.UI
 *
 * @overview:
 * This is the `TestimonialCard`, a component with the simple and noble purpose of displaying
 * someone else's kind words. It takes a testimonial object—complete with a quote and an author—and
 * lays it out in a clean, centered format. It's designed to live inside a carousel, hence the
 * `flex-shrink-0` utility to prevent it from getting squished.
 *
 * From an architectural standpoint, it's a model citizen. It uses semantic HTML (`<blockquote>`,
 * `<figure>`, `<figcaption>`) like it's going out of style, which is a rare and beautiful thing. It
 * also uses the `<picture>` tag to serve responsive images, demonstrating a level of care that
 * suggests the developer actually thought about network performance. It's a purely data-driven,
 * presentational component that does one thing and does it well. It's memoized, of course, because
 * re-rendering praise is just redundant.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ TestimonialCard (component)
 */
import type React from 'react';
import { memo } from 'react';
import { ImageWithFallback } from '../../../shared/ui/ImageWithFallback.tsx';

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
							src={testimonial.author.image.replace('.webp', '.png')}
							alt={`Portrait of ${testimonial.author.name}, who provided a testimonial.`}
							className="w-full h-full object-cover"
							fallbackText={testimonial.author.name}
						>
							<source
								media="(min-width: 768px)"
								srcSet={testimonial.author.image.replace(
									'.webp',
									'-large.webp',
								)}
								type="image/webp"
							/>
							<source
								srcSet={testimonial.author.image.replace(
									'.webp',
									'-small.webp',
								)}
								type="image/webp"
							/>
						</ImageWithFallback>
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
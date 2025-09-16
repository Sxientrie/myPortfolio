import type React from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { TestimonialCard } from "../entities/testimonial/ui/TestimonialCard.tsx";
import { SECTIONS } from "../shared/lib/constants/sections.ts";
import { testimonialsData } from "../shared/lib/data/testimonials.ts";

interface TestimonialsSectionProps {
	registerRef: (name: string, el: HTMLElement | null) => void;
}
export const TestimonialsSection = memo(
	({ registerRef }: TestimonialsSectionProps): React.ReactElement => {
		const [currentIndex, setCurrentIndex] = useState(0);
		const goToSlide = useCallback((index: number) => {
			const newIndex =
				(index + testimonialsData.length) % testimonialsData.length;
			setCurrentIndex(newIndex);
		}, []);
		useEffect(() => {
			const autoScroll = setInterval(() => {
				goToSlide(currentIndex + 1);
			}, 15000);
			return () => clearInterval(autoScroll);
		}, [currentIndex, goToSlide]);
		return (
			<section
				id={SECTIONS.TESTIMONIALS}
				className="py-16 md:py-24 px-4 md:px-8"
				ref={(el) => registerRef(SECTIONS.TESTIMONIALS, el)}
			>
				<div className="text-center mb-12">
					<h2 className="text-3xl font-medium tracking-tighter">
						What Others Say
					</h2>
					<p className="text-lg text-[oklch(95%_0_0_/_0.7)] mt-2">
						Feedback from collaborators and clients.
					</p>
				</div>
				<div className="relative overflow-hidden">
					<div
						className="flex transition-transform duration-500 ease-in-out"
						style={{ transform: `translateX(-${currentIndex * 100}%)` }}
					>
						{testimonialsData.map((testimonial) => (
							<TestimonialCard
								key={testimonial.author.name}
								testimonial={testimonial}
							/>
						))}
					</div>
					<div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4">
						<button
							type="button"
							onClick={() => goToSlide(currentIndex - 1)}
							className="bg-[oklch(100%_0_0_/_0.05)] border border-[oklch(100%_0_0_/_0.1)] text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[oklch(100%_0_0_/_0.1)]"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Previous</title>
								<path d="M15 18l-6-6 6-6" />
							</svg>
						</button>
						<button
							type="button"
							onClick={() => goToSlide(currentIndex + 1)}
							className="bg-[oklch(100%_0_0_/_0.05)] border border-[oklch(100%_0_0_/_0.1)] text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[oklch(100%_0_0_/_0.1)]"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Next</title>
								<path d="M9 18l6-6-6-6" />
							</svg>
						</button>
					</div>
					<div className="flex justify-center gap-3 mt-8">
						{testimonialsData.map((testimonial, index) => (
							<button
								type="button"
								key={testimonial.author.name}
								onClick={() => goToSlide(index)}
								className={`w-3 h-3 rounded-full border border-[oklch(100%_0_0_/_0.1)] transition-colors ${currentIndex === index ? "bg-[var(--color-aurora-primary)]" : "bg-[oklch(100%_0_0_/_0.1)] hover:bg-[oklch(100%_0_0_/_0.2)]"}`}
							/>
						))}
					</div>
				</div>
			</section>
		);
	},
);

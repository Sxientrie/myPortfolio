/**
 * @file: src/shared/lib/data/testimonials.ts
 *
 * @description: Contains the static data for the testimonials slider.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This file is where the praise lives. It exports a single array, `testimonialsData`, containing
 * the kind words and glowing reviews that power the testimonial slider. Each object is a neat
 * package of a quote and an author, complete with a name, title, and image path. It's another
 * example of keeping content separate from presentation, which is a principle we actually seem to
 * follow around here. It's simple, clean, and does exactly what you'd expect.
 *
 * @dependencies:
 * ➥ None
 *
 * @outputs:
 * ➥ testimonialsData (constant)
 */
export const testimonialsData = [
	{
		quote:
			"I'm not technical, so I needed someone who could translate my messy ideas into actual code. Jay built our MVP in 2 weeks and didn't try to upsell me on every trendy framework. The app works, customers are happy, and I can sleep at night.",
		author: {
			name: 'Claire Uy',
			title: 'LocalHire PH',
			image: '/assets/images/avatar_claire_uy.svg',
		},
	},
	{
		quote:
			"This dudes code is clean, well-documented, and doesn't break when you look at it wrong. He integrated with our existing APIs without creating a dependency nightmare. Yeah, he uses AI tools, but as actual tools—not a crutch. You can tell the difference between someone who knows what they're doing and someone just copy-pasting ChatGPT responses. Jay clearly knows his craft and uses AI to move faster, not think for him. Professional without the corporate.",
		author: {
			name: 'Marcus R.',
			title: 'DataSync',
			image: '/assets/images/avatar_marcus_r.svg',
		},
	},
	{
		quote:
			"Worked with Jay on a complete redesign of our dashboard. Dude actually listens when you explain the problem instead of immediately jumping to solutions. The end result was faster, cleaner, and our users stopped complaining about the interface. Can't ask for much more than that.",
		author: {
			name: 'Gobies',
			title: 'CodeCrafters Discord',
			image: '/assets/images/avatar_gobies.svg',
		},
	},
];
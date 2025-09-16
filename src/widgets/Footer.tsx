/**
 * @file: src/widgets/Footer.tsx
 *
 * @description: The humble site footer. It shows up at the very end to deliver the copyright
 *               notice and other assorted fine print.
 *
 * @module: Shared.UI
 *
 * @overview:
 * And here we have the `Footer`. It's the component that patiently waits at the bottom of the page
 * for its moment in the spotlight, which only comes when the user has scrolled all the way to the
 * end. Its visibility is controlled by a single boolean prop, `isVisible`, which fades it into
 * view. It's a clever little trick to keep the UI clean and uncluttered until the very last
 * moment.
 *
 * Architecturally, it's about as simple as it gets. It calculates the current year to avoid the
 * embarrassment of an outdated copyright notice and displays a couple of lines of text. It's a
 * purely presentational component, a digital epilogue to the user's journey. It's memoized,
 * naturally, because re-rendering a footer that only changes once a year would be a profound
 * waste of resources.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ Footer (component)
 */
import type React from 'react';
import { memo } from 'react';

interface FooterProps {
	isVisible: boolean;
}

export const Footer = memo(({ isVisible }: FooterProps): React.ReactElement => {
	const currentYear = new Date().getFullYear();

	return (
		<footer
			className={`p-4 px-8 flex justify-center items-center text-center text-[oklch(95%_0_0_/_0.5)] bg-[oklch(7%_0.02_265)] border-t border-[oklch(100%_0_0_/_0.05)] transition-opacity duration-500 ease-in-out relative z-[7] text-xs ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
		>
			<p className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
				<span>&copy; {currentYear} Jayson Jamora. All Rights Reserved.</span>
				<span className="hidden md:inline text-[oklch(95%_0_0_/_0.5)]">|</span>
				<span>Built with React & lots of coffee.</span>
			</p>
		</footer>
	);
});

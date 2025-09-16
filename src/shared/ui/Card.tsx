/**
 * @file: src/shared/ui/Card.tsx
 * @description: A reusable neon glass card component for consistent styling.
 * @module: Shared.UI
 * @overview: This is the Card component, a reusable container that provides the application's signature "neon glass" aesthetic. It encapsulates all the complex CSS for the glowing borders and animated shines, allowing other components like ProjectCard and BlogPostCard to use it as a simple wrapper. It accepts interactive props and an 'as' prop to render different semantic elements (e.g., 'div', 'article'), making it flexible and accessible.
 * @dependencies:
 * ➥ react
 * @outputs:
 * ➥ Card (component)
 */
import type React from 'react';
import { memo } from 'react';

type CardProps<C extends React.ElementType> = {
	as?: C;
	children: React.ReactNode;
	className?: string;
} & Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'children' | 'className'>;

export const Card = memo(
	<C extends React.ElementType = 'div'>({
		as,
		children,
		className = '',
		...props
	}: CardProps<C>): React.ReactElement => {
		const Component = as || 'div';

		return (
			<Component className={`neon-glass-card ${className}`} {...props}>
				<span className="neon-glass-shine neon-glass-shine-top"></span>
				<span className="neon-glass-shine neon-glass-shine-bottom"></span>
				<span className="neon-glass-glow neon-glass-glow-top"></span>
				<span className="neon-glass-glow neon-glass-glow-bottom"></span>
				<span className="neon-glass-glow neon-glass-glow-bright neon-glass-glow-top"></span>
				<span className="neon-glass-glow neon-glass-glow-bright neon-glass-glow-bottom"></span>
				<div className="neon-glass-inner relative z-[1] flex flex-col h-full">
					{children}
				</div>
			</Component>
		);
	},
);
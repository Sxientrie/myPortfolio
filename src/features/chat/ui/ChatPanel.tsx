/**
 * @file: src/features/chat/ui/ChatPanel.tsx
 *
 * @description: The presentational component for the chat interface, including the animated
 *               container and the panel's inner content.
 *
 * @module: Features.RepoAnalysis
 *
 * @overview:
 * This file contains the visual soul of the chat feature, split into two personalities. First, we
 * have the `ChatPanelContainer`, the flashy extrovert. Its job is to be the container that
 * performs the entire "pill-to-panel" animation. It takes the current `animationState` from the
 * `ChatController` and translates it into CSS classes that bring the animation to life. It's all
 * smoke and mirrors, but it's a good show.
 *
 * Then there's the `ChatPanel`, the quiet introvert. This component represents the actual chat
 * interface—the header, the message area, and the input footer. It's a "dumb" component that knows
 * nothing of the animation happening around it. It just renders the content and dutifully calls
 * the `onClose` function when its close button is clicked. It also cleverly uses `forwardRef` to
 * allow its parent, the `ChatPanelContainer`, to reach directly inside it and focus the text input
 * when the panel opens. This separation is key: the container handles the "how it appears," while
 * the panel handles the "what it is."
 *
 * FIXME(AI)[DOCS-001]: The module 'Features.Chat' is not in the approved list in AGENT.md. The
 * list should be updated to include this feature module. Using 'Features.RepoAnalysis' as a
 * temporary placeholder.
 *
 * @dependencies:
 * ➥ react
 * ➥ ../../../shared/lib/types/index.ts
 *
 * @outputs:
 * ➥ ChatPanelContainer (component)
 */
import type React from 'react';
import { forwardRef, memo, useEffect, useRef } from 'react';

import type { AnimState } from '../../../shared/lib/types/index.ts';

interface ChatPanelProps {
	onClose: () => void;
}

const ChatPanel = memo(
	forwardRef<HTMLInputElement, ChatPanelProps>(({ onClose }, ref) => (
		<div className="chat-panel-wrapper w-full h-full flex flex-col opacity-0">
			<header className="flex justify-between items-center p-2 px-4 flex-shrink-0 relative z-[2]">
				<h3 className="text-base font-medium">Conversation</h3>
				<button
					className="bg-transparent border-none text-[oklch(95%_0_0_/_0.5)] cursor-pointer p-2 transition-all duration-200 rounded-lg hover:text-[oklch(95%_0_0)] hover:shadow-[0_0_0_1px_oklch(95%_0_0_/_0.5)]"
					onClick={onClose}
					aria-label="Close chat panel"
				>
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M18 6L6 18"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M6 6L18 18"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</header>
			<main className="flex-grow overflow-y-auto flex flex-col gap-6 p-4 md:p-6">
				{/* TODO(AI)[DOCS-001]: The actual chat message rendering logic is missing. This main
            area is currently empty and needs to be implemented to display the conversation. */}
			</main>
			<footer className="flex gap-3 flex-shrink-0 p-4 px-6 relative z-[2]">
				<input
					ref={ref}
					type="text"
					className="flex-grow bg-[oklch(7%_0.02_265)] border border-[oklch(100%_0_0_/_0.1)] text-[oklch(95%_0_0)] py-3 px-4 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-[oklch(100%_0_0_/_0.3)] focus:bg-[oklch(5%_0.02_265)]"
					placeholder="Ask a question..."
				/>
				<button className="py-3 px-5 rounded-lg bg-[oklch(100%_0_0_/_0.08)] border border-[oklch(100%_0_0_/_0.1)] text-[oklch(95%_0_0)] cursor-pointer transition-colors duration-200 hover:bg-[oklch(100%_0_0_/_0.12)]">
					Send
				</button>
			</footer>
		</div>
	)),
);

interface ChatPanelContainerProps {
	animationState: AnimState;
	onClose: () => void;
	onAnimationEnd: (event: React.AnimationEvent<HTMLDivElement>) => void;
}

export const ChatPanelContainer = memo(
	({
		animationState,
		onClose,
		onAnimationEnd,
	}: ChatPanelContainerProps) => {
		const inputRef = useRef<HTMLInputElement>(null);

		/**
		 * FIXME(AI)[RELIABILITY-002]: The previous reliance on optional chaining was not explicit
		 * enough and has been replaced with a clearer guard clause.
		 */
		useEffect(() => {
			if (animationState !== 'open') return;
			if (!inputRef.current) return;
			inputRef.current.focus();
		}, [animationState]);

		if (animationState === 'idle') {
			return null;
		}

		const classNames = [
			'fixed bottom-4 md:bottom-[30px] w-[95vw] h-[50px] rounded-[16px] shadow-lg m-auto left-0 right-0 z-50 select-none p-px overflow-hidden bg-transparent',
			animationState === 'opening' && 'is-opening',
			animationState === 'closing' && 'is-closing',
			animationState === 'open' && 'is-open',
		]
			.filter(Boolean)
			.join(' ');

		return (
			<div
				id="chat-panel-container"
				className={classNames}
				onAnimationEnd={onAnimationEnd}
			>
				<div
					id="pill-content-mask"
					className="w-full h-full bg-[oklch(3%_0.01_265)] rounded-[15px] flex items-center justify-center overflow-hidden"
				>
					<ChatPanel onClose={onClose} ref={inputRef} />
				</div>
			</div>
		);
	},
);

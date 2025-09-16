import type React from "react";
import { forwardRef, memo, useEffect, useRef } from "react";
import type { AnimState } from "../../../shared/lib/types/index.ts";
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
				{}
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
	({ animationState, onClose, onAnimationEnd }: ChatPanelContainerProps) => {
		const inputRef = useRef<HTMLInputElement>(null);
		useEffect(() => {
			if (animationState !== "open") return;
			if (!inputRef.current) return;
			inputRef.current.focus();
		}, [animationState]);
		if (animationState === "idle") {
			return null;
		}
		const classNames = [
			"fixed bottom-4 md:bottom-[30px] w-[95vw] h-[50px] rounded-[16px] shadow-lg m-auto left-0 right-0 z-50 select-none p-px overflow-hidden bg-transparent",
			animationState === "opening" && "is-opening",
			animationState === "closing" && "is-closing",
			animationState === "open" && "is-open",
		]
			.filter(Boolean)
			.join(" ");
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

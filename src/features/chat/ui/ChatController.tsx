import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { AnimState } from "../../../shared/lib/types/index.ts";
import { ChatContext } from "../ChatContext.tsx";
import { ChatPanelContainer } from "./ChatPanel.tsx";

interface ChatControllerProps {
	children: React.ReactNode;
}
export function ChatController({
	children,
}: ChatControllerProps): React.ReactElement {
	const [animationState, setAnimationState] = useState<AnimState>("idle");
	const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
	const [overlayClass, setOverlayClass] = useState<string>("");
	const handleChatTrigger = useCallback(() => {
		if (animationState === "idle") {
			setAnimationState("opening");
		}
	}, [animationState]);
	const handleCloseChat = useCallback(() => {
		if (animationState === "open") {
			setAnimationState("closing");
		}
	}, [animationState]);
	const handleAnimationEnd = useCallback(
		(event: React.AnimationEvent<HTMLDivElement>) => {
			const animationName =
				(event.nativeEvent as AnimationEvent).animationName || "";
			if (animationName.startsWith("open-pill")) {
				setAnimationState("open");
			} else if (animationName.startsWith("close-pill")) {
				setAnimationState("idle");
			}
		},
		[],
	);
	useEffect(() => {
		const isChatOpeningOrOpen =
			animationState === "opening" || animationState === "open";
		document.body.classList.toggle("is-chat-open", isChatOpeningOrOpen);
		if (isChatOpeningOrOpen) {
			setIsOverlayVisible(true);
			setOverlayClass("is-entering");
		} else if (animationState === "closing") {
			setOverlayClass("is-exiting");
		}
	}, [animationState]);
	const contextValue = useMemo(
		() => ({
			openChat: handleChatTrigger,
		}),
		[handleChatTrigger],
	);
	return (
		<ChatContext.Provider value={contextValue}>
			{children}
			{isOverlayVisible && (
				<div
					className={`fixed inset-0 bg-[oklch(0_0_0_/_0.5)] backdrop-blur-sm z-40 pointer-events-none ${overlayClass}`}
					onAnimationEnd={() => {
						if (overlayClass === "is-exiting") setIsOverlayVisible(false);
					}}
				/>
			)}
			<ChatPanelContainer
				animationState={animationState}
				onClose={handleCloseChat}
				onAnimationEnd={handleAnimationEnd}
			/>
		</ChatContext.Provider>
	);
}

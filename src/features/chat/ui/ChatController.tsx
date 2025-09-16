/**
 * @file: src/features/chat/ui/ChatController.tsx
 *
 * @description: The stateful controller component that orchestrates the entire chat feature's
 *               lifecycle.
 *
 * @module: Features.RepoAnalysis
 *
 * @overview:
 * This is the `ChatController`, the brains of the chat operation. It's a "smart" component that
 * wraps a portion of the component tree (or the whole app) and provides the magic of the chat
 * feature. Its main job is to manage a state machine that dictates whether the chat panel is idle,
 * opening, fully open, or in the process of closing. It's the central command from which all
 * chat-related state flows.
 *
 * Architecturally, it serves as the `ChatContext.Provider`, generously bestowing the `openChat`
 * function upon any descendant component that asks for it. This neatly decouples the button that
 * *opens* the chat from the component that *is* the chat. It also handles all the messy side
 * effects, like paralyzing the body scroll when the chat is open and managing a translucent
 * overlay. It listens for CSS `animationend` events to keep its internal React state perfectly in
 * sync with the visual animations. It's a classic controller component: all logic, no UI. It
 * renders the `ChatPanelContainer` but delegates all the messy presentational details to it.
 *
 * FIXME(AI)[DOCS-001]: The module 'Features.Chat' is not in the approved list in AGENT.md. The
 * list should be updated to include this feature module. Using 'Features.RepoAnalysis' as a
 * temporary placeholder.
 *
 * @dependencies:
 * ➥ react
 * ➥ ../ChatContext.tsx
 * ➥ ./ChatPanel.tsx
 * ➥ ../../../shared/lib/types/index.ts
 *
 * @outputs:
 * ➥ ChatController (component)
 */
import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ChatContext } from '../ChatContext.tsx';
import { ChatPanelContainer } from './ChatPanel.tsx';
import type { AnimState } from '../../../shared/lib/types/index.ts';

interface ChatControllerProps {
	children: React.ReactNode;
}

export function ChatController({
	children,
}: ChatControllerProps): React.ReactElement {
	const [animationState, setAnimationState] = useState<AnimState>('idle');
	const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
	const [overlayClass, setOverlayClass] = useState<string>('');

	const handleChatTrigger = useCallback(() => {
		if (animationState === 'idle') {
			setAnimationState('opening');
		}
	}, [animationState]);

	const handleCloseChat = useCallback(() => {
		if (animationState === 'open') {
			setAnimationState('closing');
		}
	}, [animationState]);

	const handleAnimationEnd = useCallback(
		(event: React.AnimationEvent<HTMLDivElement>) => {
			const animationName = (event.nativeEvent as any).animationName || '';
			if (animationName.startsWith('open-pill')) {
				setAnimationState('open');
			} else if (animationName.startsWith('close-pill')) {
				setAnimationState('idle');
			}
		},
		[],
	);

	useEffect(() => {
		const isChatOpeningOrOpen =
			animationState === 'opening' || animationState === 'open';
		document.body.classList.toggle('is-chat-open', isChatOpeningOrOpen);

		if (isChatOpeningOrOpen) {
			setIsOverlayVisible(true);
			setOverlayClass('is-entering');
		} else if (animationState === 'closing') {
			setOverlayClass('is-exiting');
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
						if (overlayClass === 'is-exiting') setIsOverlayVisible(false);
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

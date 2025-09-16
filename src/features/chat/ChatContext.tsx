/**
 * @file: src/features/chat/ChatContext.tsx
 *
 * @description: Defines the React Context for the chat feature, establishing the shared API for
 *               child components.
 *
 * @module: Features.RepoAnalysis
 *
 * @overview:
 * This file is the heart of the chat feature's state-sharing mechanism. It creates a
 * `ChatContext`, which is basically a magical portal that allows any component wrapped within its
 * provider to access a shared set of functions or state without the hassle of prop drilling. In
 * this case, it defines a simple contract: any component that plugs into this context will get
 * access to an `openChat` function. It's initialized with `undefined` as a "friendly" reminder to
 * any developer who forgets to wrap their components in the corresponding `ChatProvider`. It's the
 * central nervous system for controlling the chat panel.
 *
 * FIXME(AI)[DOCS-001]: The module 'Features.Chat' is not in the approved list in AGENT.md. The
 * list should be updated to include this feature module. Using 'Features.RepoAnalysis' as a
 * temporary placeholder.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ ChatContext (React.Context object)
 */
import { createContext } from 'react';

interface ChatContextType {
	openChat: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

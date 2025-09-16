import { createContext } from "react";

interface ChatContextType {
	openChat: () => void;
}
export const ChatContext = createContext<ChatContextType | undefined>(
	undefined,
);

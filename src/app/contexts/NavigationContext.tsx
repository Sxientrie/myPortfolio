import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useRef,
	ReactNode,
} from "react";
import { getBlogPosts } from "../../shared/lib/data/blog";
import { BlogPost } from "../../shared/types/blog";

// Define the shape of the context data
interface NavigationContextType {
	blogPosts: BlogPost[];
	isLoadingPosts: boolean;
	activeSection: string;
	sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
	registerRef: (name: string, el: HTMLElement | null) => void;
}

// Create the context with a default value of null, which will be checked in the hook
const NavigationContext = createContext<NavigationContextType | null>(null);

// Create the provider component
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
	const [activeSection, setActiveSection] = useState<string>("");
	const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
	const [isLoadingPosts, setIsLoadingPosts] = useState(true);

	const registerRef = useCallback((name: string, el: HTMLElement | null) => {
		if (el) {
			sectionRefs.current[name] = el;
		}
	}, []);

	// Fetch blog posts
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const posts = await getBlogPosts();
				setBlogPosts(posts);
			} catch (error) {
				console.error("Failed to fetch blog posts:", error);
			} finally {
				setIsLoadingPosts(false);
			}
		};
		fetchPosts();
	}, []);

	// Effect for intersection observer to set the active section
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ root: null, rootMargin: "0px", threshold: 0.3 },
		);

		const currentRefs = Object.values(sectionRefs.current);
		currentRefs.forEach((section) => {
			if (section instanceof HTMLElement) {
				observer.observe(section);
			}
		});

		return () => {
			currentRefs.forEach((section) => {
				if (section instanceof HTMLElement) {
					observer.unobserve(section);
				}
			});
		};
	}, [isLoadingPosts]);


	const value = {
		blogPosts,
		isLoadingPosts,
		activeSection,
		sectionRefs,
		registerRef,
	};

	return (
		<NavigationContext.Provider value={value}>
			{children}
		</NavigationContext.Provider>
	);
};

// Create a custom hook to use the context, ensuring it's not null
export const useNavigation = (): NavigationContextType => {
	const context = useContext(NavigationContext);
	if (context === null) {
		throw new Error("useNavigation must be used within a NavigationProvider");
	}
	return context;
};
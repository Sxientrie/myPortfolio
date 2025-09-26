import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useRef,
	ReactNode,
} from "react";
import { SECTIONS } from "../../shared/lib/constants/sections";
import { getBlogPosts } from "../../shared/lib/data/blog";

// Define the shape of the context data
interface NavigationContextType {
	currentPage: "portfolio" | "blog" | "blogPost";
	currentPostSlug: string | null;
	blogPosts: any[]; // In a real app, this would be a BlogPost[] type
	isLoadingPosts: boolean;
	handleNavigate: (destination: string) => void;
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
	const [currentPage, setCurrentPage] = useState<
		"portfolio" | "blog" | "blogPost"
	>("portfolio");
	const [currentPostSlug, setCurrentPostSlug] = useState<string | null>(null);
	const [navigationTarget, setNavigationTarget] = useState<string | null>(null);
	const [blogPosts, setBlogPosts] = useState<any[]>([]);
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

	// Handle navigation logic
	const handleNavigate = (destination: string): void => {
		const portfolioSections = [...Object.values(SECTIONS), "contact"];
		const isSection = portfolioSections.includes(destination);
		if (isSection) {
			if (currentPage !== "portfolio") {
				setCurrentPage("portfolio");
				setNavigationTarget(destination);
			} else {
				sectionRefs.current[destination]?.scrollIntoView({
					behavior: "smooth",
				});
			}
		} else if (destination === "blog") {
			if (currentPage !== "blog") {
				setCurrentPage("blog");
				setCurrentPostSlug(null);
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
		} else if (destination === "portfolio") {
			if (currentPage !== "portfolio") {
				setCurrentPage("portfolio");
				setCurrentPostSlug(null);
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
		} else {
			const postExists = blogPosts.some((post) => post.slug === destination);
			if (postExists) {
				setCurrentPage("blogPost");
				setCurrentPostSlug(destination);
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
		}
	};

	// Effect to handle scrolling to a section after navigating back to the portfolio page
	useEffect(() => {
		if (currentPage === "portfolio" && navigationTarget) {
			const section = sectionRefs.current[navigationTarget];
			if (section) {
				// Timeout to ensure the section is rendered before scrolling
				setTimeout(() => {
					section.scrollIntoView({ behavior: "smooth" });
				}, 100);
			}
			setNavigationTarget(null);
		}
	}, [currentPage, navigationTarget]);

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
		currentPage,
		currentPostSlug,
		blogPosts,
		isLoadingPosts,
		handleNavigate,
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
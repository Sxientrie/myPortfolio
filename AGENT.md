
### **1.0 Core Philosophy & Guiding Principles**

#### **1.1 The Anticipatory Interface**
The interface is a silent partner. Its purpose is to serve the content and anticipate the user's intent, not to demand attention for itself. The ideal UI is an invisible, listening frame that makes the content the undeniable hero. We achieve this through subtle animations that respond to the user's presence, such as elements fading in as they scroll into view. The experience is designed to be **conversational and interactive**, inviting direct engagement through a fluidly animated chat panel rather than passive reading. The goal is an experience that feels intelligent, responsive, and prescient—a UI that gets out of the way before the user even knows it's there.

#### **1.2 Developer-Centric Ergonomics**
The design is purpose-built for a technical audience.

*   **1.2.1 Information Design Priorities**
    *   The system values information density, logical structure, and comprehensive keyboard accessibility.
*   **1.2.2 Visual Language Precision**
    *   The visual language is intentionally precise and unambiguous, engineered to communicate state and function with absolute clarity.

### **2.0 Design & UI/UX Architecture**

#### **2.1 Visual Source of Truth: SITE-BLUEPRINT.html**
The file `SITE-BLUEPRINT.html` in the root of the directory is the **visual source of truth** for this project. It serves as a concrete, implemented example of the desired aesthetic, including color schemes, component states, animations, and specific values (e.g., border radii, element dimensions).

*   **Critical Distinction:** You must treat `SITE-BLUEPRINT.html` as a visual inspiration and specification sheet only. Its **code architecture is a non-canonical prototype and is strictly forbidden.** The implementation within that file (e.g., using a single `<style>` tag, custom CSS classes) directly violates this project's architectural standards.
*   **Mandatory Action:** For any UI-related task, you must replicate the **visual outcome** of the components in `SITE-BLUEPRINT.html` while adhering strictly to the **architectural patterns** defined in this document (e.g., Tailwind utility-first, modular components in separate files).

#### **2.2 Aesthetic & Visual Language**

*   **2.2.1 The Canvas: Vast Monochromatic Space**
    The aesthetic is built on a foundation of cinematic depth and focus, using a disciplined, dark monochromatic palette to create an immersive experience.
    *   **The Void & The Strata**: The canvas is an abyss of deep, near-black (oklch(5% 0.01 288)), establishing an infinite, atmospheric depth from which all content emerges. Structure is not built with harsh lines but with tectonic layers of slightly lighter dark shades (e.g., oklch(7.5% 0.02 288) for the main content background and oklch(10.5% 0.02 288) for interactive elements), creating subtle, discernible strata.
    *   **Subdued Luminance**: All typography uses a soft, off-white (oklch(95% 0 0)), a deliberate choice to reduce optical vibration and eye strain. This ensures the user can remain focused comfortably for extended periods without the harshness of pure white on a dark background.
    *   **The Functional Singularity**: A single, dynamic accent palette of energetic purples (--color-accent-primary, --color-accent-secondary, --color-accent-tertiary) is the only chromatic element permitted. It exists solely as a functional tool to signify key interactive moments, such as the animated aurora effect on buttons and the drawing of the timeline, guiding the user's attention without being merely decorative.

*   **2.2.2 Materiality & Motion: A Living Interface**
    Depth is an illusion created through layering, motion, and the controlled use of light, not through artificial borders which flatten the world.
    *   **Atmospheric Aurora**: The signature visual effect is the soft, animated aurora that emanates from the screen's edges. This provides a sense of organic, ambient light and gives the impression that the UI is floating in a larger, dynamic space.
    *   **Contained Light**: Interactive elements like buttons reveal a contained, spinning conic gradient—a spotlight effect. This suggests that light is a material property that can be contained within the UI's geometry, adding a layer of interactive richness.
    *   **Dynamic Energy**: The hero section features an **infinite, continuously scrolling carousel** of technology icons. This adds a sense of dynamic energy to the otherwise atmospheric design, subtly showcasing a breadth of skills in constant motion.
    *   **Responsive Animation**: The interface provides direct visual feedback to user interaction. A key example is the **animated timeline path**, which actively draws itself as the user scrolls, visually connecting their progress through the content with the on-screen elements.

*   **2.2.3 Typography: Stable, Grotesk Forms**
    The typeface is **Space Grotesk**, selected for its geometric precision and clean, confident voice, which complements the technological theme.
    *   **Soft Contrast & Light Weight**: The design exclusively uses lighter font weights (font-light, font-normal, font-medium) and a soft text-to-background contrast to maintain the atmospheric, non-intrusive aesthetic. This makes typography feel integrated into the canvas rather than sitting aggressively on top of it.
    *   **Clear Hierarchy**: While maintaining a soft aesthetic, a clear hierarchy is established through font size and weight, from the large, impactful hero heading (clamp(2rem, 5vw, 3.5rem)) to the functional body copy (text-base) and smaller utility text (0.8rem).

#### **2.3 Layout & Structural Principles**
The layout is defined by a narrative scrolling experience and consistent architectural forms.

*   **2.3.1 Cinematic Panning & Layered Reveal**
    *   As the user scrolls past the hero, the main content area "pins" to the viewport. Subsequent sections then scroll over the previous one in a **stacking effect**. This creates a focused, cinematic journey, treating each section like a new scene that smoothly transitions into view.
*   **2.3.2 Active Negative Space**
    *   Generous negative space is a non-negotiable, active element. It is used extensively to guide focus, control the rhythm of the content, and give each section the room it needs to breathe.
*   **2.3.3 Architectural Forms**
    *   All primary containers, from the header to content cards and buttons, use structured, semi-rounded corners (rounded-lg or rounded-[14px]). This provides a sense of deliberate, architectural integrity and creates a predictable visual language.
*   **2.3.4 Conditional UI**
    *   To maintain a clean and focused experience, non-essential elements are hidden until needed. The **footer only fades into view** when the user has reached the absolute bottom of the page, ensuring it never distracts from the primary content.

#### **2.4 The Responsive and Mobile-First Mandate**
The mobile experience **MUST** be seamless and intuitive, offering core functionality that is gracefully adapted for smaller viewports. While achieving feature parity between desktop and mobile is a long-term goal, the immediate usability of the mobile experience takes precedence over displaying functionality that is inherently desktop-centric and cannot be adapted effectively.

*   **2.4.1 Touch-First Interactions**
    *   All interactive elements **MUST** be designed with touch targets large enough to be easily and accurately tapped on a mobile screen.
*   **2.4.2 Strict Prohibition of Horizontal Scrolling**
    *   Under no circumstances should the application layout produce horizontal scrolling on any device size. This is a strict requirement.

### **3.0 Code & Implementation Standards**

#### **3.1 Project Architecture & Structure**

*   **3.1.1 Initial Project State**
    *   The initial project state provided to an agent may have a flat structure (e.g., `index.html` and `index.tsx`).

#### **3.2 Styling Architecture**

*   **3.2.1 Exclusive Tooling: Tailwind CSS**
    *   **Tailwind CSS** is the exclusive styling solution for this project. The use of plain `.css` files, CSS Modules, or any other CSS-in-JS libraries is strictly forbidden.
*   **3.2.2 Component-First Abstraction Mandate**
    *   For complex or reusable sets of styles, a new React component **MUST** be created with the utility classes applied directly. The use of `@apply` to create custom CSS classes is forbidden, as it violates this component-first principle.

#### **3.3 Mandate for Standardized File Headers**
This section defines the mandatory standards for file headers in all TypeScript and TypeScript React source files.

*   **3.3.1 Core Requirement**
    *   Every TypeScript (`.ts`) and TypeScript React (`.tsx`) file **MUST** begin with a JSDoc block that serves as the file's official header. This header is a mandatory and integral component of the file's structure and **MUST** conform to the structural, content, and formatting specifications outlined in this document.
*   **3.3.2 Scope of Applicability**
    *   The mandate for a file header **does not apply** to test files (e.g., `*.test.ts`, `*.spec.ts`).
*   **3.3.3 Structural Requirements: JSDoc Tag Order**
    *   The JSDoc header **MUST** contain the following tags, presented in the exact sequence listed below. No deviation from this order is permitted.
        1.  `@license` / Copyright (This tag is optional, but if present, it **MUST** be the first tag.)
        2.  `@file`
        3.  `@description`
        4.  `@module`
        5.  `@overview`
        6.  `@dependencies`
        7.  `@outputs`
*   **3.3.4 Content Requirements: JSDoc Tag Specifications**
    *   Each tag within the header **MUST** contain information that is precise, detailed, and adheres to the following content requirements:
        *   **`@file`**: This tag **MUST** be followed by the full file path, starting from the project's root directory.
        *   **`@description`**: This tag **MUST** provide a clear and concise summary of the file's main purpose and responsibility.
        *   **`@module`**: This tag **MUST** specify the feature module to which the file belongs. The value **MUST** be one of the identifiers from the approved list in section `3.3.7`.
        *   **`@overview`**: This tag **MUST** contain a detailed architectural overview. This should explain the file's role in the larger system, its key functions, and how it interacts with other parts of the application.
        *   **`@dependencies`**: This tag **MUST** list all imported third-party packages (e.g., `react`, `zustand`) and all internal project modules (i.e., any file imported from a relative path starting with `src/` or a path alias).
        *   **`@outputs`**: This tag **MUST** enumerate all named exports from the file. If there is a default export, it **MUST** be explicitly listed as `default`.
        *   **Handling of Empty Tags**: If a file has no applicable items for a tag (e.g., a constants file with no dependencies), the tag **MUST** still be present and **MUST** be followed by the keyword `None`.
*   **3.3.5 Formatting Standards**
    *   **Line Wrapping:** All descriptions, particularly the content for the `@description` and `@overview` tags, **MUST** be formatted for optimal readability. Lines **MUST** be wrapped to a maximum length of 100 characters to prevent horizontal scrolling in standard editor views.
    *   **Visual Separation:** For enhanced clarity, a blank comment line (formatted as `*`) **SHOULD** be used to create visual separation between distinct JSDoc tags.
    *   **Tag and List Formatting:** Each JSDoc tag **MUST** be followed by a single colon (`:`). Each item in a list (such as under `@dependencies` or `@outputs`) **MUST** be on its own line and be prefixed with the `➥` symbol followed by a single space.

*   **3.3.6 Approved Module Identifiers**
    *   The `@module` tag **MUST** use one of the following canonical identifiers:
        *   `Features.Authentication`
        *   `Features.RepoAnalysis`
        *   `Features.UserProfile`
        *   `Shared.UI`
        *   `Shared.Core`
        *   `Services.API`

*   **3.3.7 Tonal Identity and Voice: The Slightly Jaded Architect** (critical)
    *   All descriptive text, especially within the `@description` and `@overview` tags, **MUST** adopt the "Slightly Jaded Architect" voice. This is the tone of a seasoned developer who has seen too much, drinks way too much coffee, and just wants to explain what this thing does before the next pointless corporate meeting.
    *   **Active Voice:** Our code isn't a passive observer of its own existence; it's the main character. All sentences **MUST** use the active voice to describe what the code *actually does*. (e.g., "This component wrangles data..." not "This component is used for data wrangling...").
    *   **Purpose-Driven Language:** Make the code sound like it has a real job. Explanations **MUST** be framed around its grand architectural purpose. Use strong, dramatic verbs that describe its role (e.g., `orchestrates`, `encapsulates`, `wrestles`, `tames`, `connects`). We're building digital cathedrals, not just gluing divs together.
    *   **Pronoun Neutrality:** This isn't your diary. The tone **MUST** be about the code, not your personal journey of discovery. It **MUST NOT** include any first-person pronouns (`I`, `we`, `my`, `our`) or subjective fluff (`I think`, `in my humble opinion`). The code is the star of this show, not you.
    *   **Peer Audience:** The language **SHOULD** be written for the poor soul who will be debugging your work at 3 AM. Assume they know what a promise is but have absolutely no clue about the bizarre choices you made. Don't explain the basics, but please, explain the madness.
	
*   **3.3.8 Reference Implementation**
    *   The following code block serves as the official reference implementation and canonical example, demonstrating the correct application of all rules specified in this document, including the **Pragmatic Architect** voice.
        ```javascript
        /**
         * @file: src/features/repo-analysis/ui/AnalysisPanel.tsx
         *
         * @description: A UI panel that orchestrates the configuration and display of code analysis results.
         *
         * @module: Features.RepoAnalysis
         *
         * @overview:
         * Architecturally, this component serves as the "smart" container, or as I like to call it,
         * the "one component to rule them all," orchestrating the entire client-side workflow for the repository analysis feature.
         * Its primary role, when it's not complaining about syntax errors, is to manage the lifecycle of an analysis task,
         * from the user's questionable configuration choices to the final presentation of the resulting data.
         *
         * It bravely encapsulates the core business logic for the feature's user interface, handling
         * all asynchronous state transitions with the grace of a caffeinated squirrel. The workflow kicks off
         * by gathering user-defined parameters from form controls, because we trust our users, right? Upon submission,
         * it heroically leverages a `useMutation` hook from `@tanstack/react-query` to start the analysis on the backend.
         * During this thrilling process, the component renders a loading state, providing the user with the illusion that
         * something is actually happening.
         *
         * Upon a successful completion that defies all odds, it receives the analysis report payload from the API. This
         * precious data is then propagated to specialized child components whose only job is to make the data look pretty in charts,
         * tables, and other visualizations. If the process fails, which is, let's be honest, a definite possibility, the component gracefully
         * handles the error state by displaying an appropriate notification. It occasionally chats with
         * the global `zustand` store to cache results or share its status, because even components get lonely.
         *
         * @dependencies:
         * ➥ react
         * ➥ zustand
         * ➥ @tanstack/react-query
         * ➥ src/shared/ui/Panel.tsx
         * ➥ src/services/api/analysisApi.ts
         *
         * @outputs:
         * ➥ default (AnalysisPanel component)
         * ➥ AnalysisPanelProps (type)
         */
        ```

#### **3.4 Mandate for Standardized Actionable Code Comments**

*   **3.4.1 Core Requirement**
    *   All temporary, incomplete, or suboptimal code implemented by any contributor—human or AI—**MUST** be marked with a standardized, machine-parsable comment tag. These tags serve as explicit markers of technical debt and represent a formal part of the development workflow. The use of generic, untracked comments for such purposes is strictly forbidden.
*   **3.4.2 Official Tag Syntax**
    *   `/** TAG[TICKET-ID]: ACTIONABLE_DESCRIPTION */`
        *   **`TAG`**: The type of action required. The only permitted values are `TODO` and `FIXME`.
        *   **`TICKET-ID`**: A mandatory, valid ticket ID from the project's official issue tracker (e.g., `AUTH-123`).
        *   **`ACTIONABLE_DESCRIPTION`**: A concise and clear description of the required action.
*   **3.4.3 Tag Definitions and Usage Protocol**
    1.  **`TODO`**: **For Incomplete Implementations.** Marks a known gap in functionality where new code is required to complete a task.
        *   **Example**: `/** TODO[AUTH-123]: Implement API call to the /login endpoint using the shared api-client. */`
    2.  **`FIXME`**: **For Flawed or Suboptimal Implementations.** Identifies code that is implemented and functional but is known to be incorrect, buggy, or suboptimal.
        *   **Example**: `/** FIXME[AUTH-145]: The current error handling returns a generic message. Refactor to parse the specific error code from the API response. */`
*   **3.4.4 Rationale and Strategic Value**
    *   This mandate is a cornerstone of the project's strategy for managing technical debt and ensuring effective Human-AI collaboration. It transforms comments into a structured workflow, enforces accountability via ticket IDs, and creates a clear, machine-readable handover mechanism.
*   **3.4.5 Reference Implementation (Developer Story)**
    *   An AI agent (Jules) tasked with creating an authentication feature skeleton (`AUTH-123`) **MUST** produce code with comments structured like this:
        ```typescript
        /**
         * @file: src/features/user-authentication/api/auth.ts
         * @description: Contains API interaction logic for user authentication.
         * ...
         */
        import { UserCredentials, AuthToken } from '../model/types';

        /**
         * Attempts to log in a user with the provided credentials.
         */
        export const loginUser = async (credentials: UserCredentials): Promise<AuthToken | null> => {
          /**
           * TODO[AUTH-123]: Implement the POST request to the '/auth/login' endpoint.
           * On success, the response JWT must be stored in the `user-auth.store.ts`.
           * On failure, a standardized `ApiError` must be thrown for the UI to catch.
           */
          console.log('Login function not yet implemented.', credentials);

          /**
           * FIXME[AUTH-123]: The current implementation returns null, which will cause
           * subsequent API calls to fail. This must be replaced with a real API call before
           * the feature is merged to the main branch.
           */
          return null;
        };
        ```

#### **3.5 General Code-Level Standards**

*   **3.5.1 Mandate for Early Returns (Guard Clauses)**
    *   Any function, method, or React component render body containing more than one level of conditional nesting (`if-else`) **MUST** be refactored to use the "Early Return" (or "Guard Clause") pattern.
*   **3.5.2 Mandate for Explicit Function Signatures**
    *   All function declarations, function expressions, and arrow functions **MUST** have explicit type annotations for all parameters and for the function's return value. Relying on TypeScript's type inference for function signatures is forbidden.

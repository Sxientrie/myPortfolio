# Project Overview: Interactive Developer Portfolio

## Project Summary

This project is an interactive, single-page web application that serves as the professional portfolio for Jayson Jamora, a full-stack developer. The application showcases his skills, professional experience, and featured projects. A key differentiator is its conversational user interface, powered by the Gemini API, which allows visitors to "chat" with the portfolio to get information, making for a more engaging and memorable experience. The application also includes a functional contact form for direct inquiries.

## Technology Stack

The application is built with a modern Jamstack architecture.

*   **Frontend:**
    *   **Framework:** React (v19)
    *   **Language:** TypeScript
    *   **Styling:** Tailwind CSS (via CDN) with custom CSS for complex animations.
*   **Backend (Serverless):**
    *   **Platform:** Vercel Serverless Functions
    *   **Language:** TypeScript / Node.js
*   **Key Services & APIs:**
    *   **AI / Conversational UI:** Google Gemini API
    *   **Email Delivery:** Resend API (for the contact form)
*   **Development & Tooling:**
    *   **Bundler / Transpilation:** Vite
    *   **Linting/Formatting:** Biome

## High-Level Architecture

The project is a **Single Page Application (SPA)** built on a **Jamstack** architecture.

*   **Frontend:** The core is a static React application that handles all rendering and UI logic. It is structured using a modular, component-based pattern that resembles Feature-Sliced Design, with clear separation between high-level page sections (`widgets`), self-contained features (`features`), business-specific components (`entities`), and shared utilities (`shared`).
*   **Backend:** Backend functionality is handled by serverless functions located in the `/api` directory. Currently, this includes a function to process contact form submissions, which securely communicates with the external Resend email API.
*   **State Management:** Application state is managed locally within components using React Hooks (`useState`, `useContext`). A dedicated React Context (`ChatContext`) is used to provide the chat functionality to all components.

## Key Components/Services

*   **`src/app/App.tsx`**: The root component that assembles the entire page layout from the various `widget` components. It orchestrates the main UI and initializes the Chat feature.
*   **`src/widgets/`**: This directory contains the major, high-level sections of the portfolio, such as `HeroSection`, `SiteHeader`, `StackingSections` (which includes About, Experience, and Projects), and `Footer`.
*   **`src/features/chat/`**: This module encapsulates the entire conversational UI. The `ChatController` manages the state (opening, open, closing) of the `ChatPanel`, providing a seamless and animated user experience.
*   **`api/send-email.ts`**: A critical serverless function that acts as a secure backend for the contact form. It receives form data from the frontend, validates it, and uses the Resend API to send an email to the site owner.
*   **`src/shared/lib/data/`**: This directory contains all the hardcoded content for the portfolio, such as work experience, project details, and testimonials.

## Local Development Setup

The project uses Vite for a modern, fast development experience.

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    *   The contact form and Gemini API require API keys to function. Create a file named `.env.local` in the project root.
    *   Add the following variables to the file, replacing the placeholder values:
        ```
        GEMINI_API_KEY=your_gemini_api_key
        RESEND_API_KEY=your_resend_api_key
        RECIPIENT_EMAIL=your_email@example.com
        ```

4.  **Run the Development Server:**
    *   To run both the frontend and the serverless backend functions, use the Vercel CLI. This is the recommended approach.
    *   Install the Vercel CLI if you haven't already: `npm install -g vercel`.
    *   Run the project:
        ```bash
        vercel dev
        ```
    *   This will start the Vite development server for the frontend and make the serverless functions in `/api` available, making the contact form fully functional. Open your browser to the URL provided.

5.  **Run Frontend Only (Optional):**
    *   If you only need to work on the frontend and don't require the contact form to be functional, you can use the standard Vite command:
        ```bash
        npm run dev
        ```

## Build & Deployment Process

The project is optimized for deployment on **Vercel**.

*   **Deployment Method:** The recommended method is to connect a Git repository (e.g., on GitHub) to a Vercel project.
*   **Process:** On every `git push`, Vercel will automatically:
    1.  Detect the project as a React application.
    2.  Build the frontend into static assets.
    3.  Deploy the serverless functions found in the `/api` directory.
    4.  Handle environment variables configured in the Vercel project settings.

## Data Models / Schema

The application does not use a traditional database. All content is managed through static data arrays and TypeScript interfaces.

*   **`Project` Interface (`src/shared/types/project.ts`):** Defines the data structure for a single portfolio project.
    *   `imagePlaceholder`: `string`
    *   `title`: `string`
    *   `description`: `string`
    *   `tech`: `string[]`
    *   `githubUrl`: `string`
*   **Data Files:** The content is stored in files within `src/shared/lib/data/`, such as `projects.ts`, `experience.ts`, and `testimonials.ts`. To update portfolio content, these files must be edited directly.
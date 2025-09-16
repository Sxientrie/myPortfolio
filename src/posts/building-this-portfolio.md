---
title: Building This Portfolio: A Deep Dive into the Tech Stack
date: September 18, 2025
excerpt: A technical breakdown of how this interactive portfolio was built, from the conversational Gemini API to the subtle UI animations that bring it to life.
imagePlaceholder: 'assets/images/project_conversational_portfolio.webp'
tags: [React, Gemini API, Case Study, Tailwind]
---

This portfolio isn't just a static site; it's an interactive application designed to showcase not just what I've done, but how I think. Every design choice and piece of technology was selected to serve that purpose. Here's a look under the hood.

### Core Frontend: React & TypeScript

The foundation of the site is a **React single-page application**, chosen for its component-based architecture and robust ecosystem. This modular approach allows for clean separation of concerns and makes the codebase easier to maintain and scale.

*   **Language:** The entire frontend is written in **TypeScript**. This adds a layer of static typing that catches errors early and makes the code more self-documenting.
*   **State Management:** To keep things light and avoid unnecessary dependencies, all state is managed locally within components using React's built-in hooks (`useState`, `useEffect`, `useContext`).
*   **No Build Step (Almost):** For simplicity and to demonstrate core web development principles, the project relies on CDNs for React and uses Babel's standalone script for in-browser JSX transpilation.

### The Conversational Core: Gemini API

The standout feature is the conversational interface, powered by **Google's Gemini API**. This transforms the portfolio from a passive document into an active dialogue.

> Instead of just reading my resume, visitors can ask specific questions about my skills, dive deeper into project details, or even get my thoughts on tech trends. It's a more engaging and memorable user experience.

The integration is handled via a serverless function to securely manage API keys and requests.

### Styling: A Tale of Two Systems

The visual identity of the site is crafted using a hybrid approach to styling.

*   **Utility-First with Tailwind CSS:** The vast majority of the layout, spacing, and typography is handled by **Tailwind CSS**. This allows for rapid prototyping and maintains a consistent design system directly in the markup.
*   **Custom CSS for the Magic:** For the more complex and bespoke animations—like the aurora background, the 3D pulsing logo, and the chat panel's "pill-to-panel" transition—I used custom CSS keyframe animations. These are injected via a single global styles component.

This combination provides the best of both worlds: the speed of utility classes for 90% of the work, and the power of custom CSS for the unique visual flair that makes the site feel alive.

### Backend: The Serverless Approach

All backend logic is handled by **serverless functions**, deployed on a platform like Vercel.

*   **Contact Form:** The contact form submits data to a serverless function that uses the **Resend API** to securely send me an email.
*   **Gemini API Gateway:** All communication with the Gemini API is proxied through a serverless function.

This architecture ensures scalability and security without the overhead of managing a dedicated server. It's a modern, efficient way to handle backend tasks for a Jamstack application.
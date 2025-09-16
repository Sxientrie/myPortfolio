/**
 * @file: src/shared/ui/GlobalStyles.tsx
 *
 * @description: A component that injects a block of global CSS into the application. 
 * A necessary evil.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This, dear developer, is where the architectural rules go to die. The `GlobalStyles` component
 * is a monument to pragmatism over purity. Its one and only job is to inject a massive, multi-line
 * string of raw CSS directly into the document's head via a `<style>` tag. It's a flagrant,
 * unapologetic violation of the "Tailwind only" mandate, but it's also the beating heart of all
 * the complex animations that make this site feel alive.
 *
 * Inside this string, you'll find the definitions for everything from the custom scrollbar and the
 * animated aurora effects to the entire, elaborate open-and-close choreography of the chat panel.
 * It's a centralized repository of all the CSS magic that was too complex or bespoke to be handled
 * by Tailwind's utility classes alone. While it's an organizational sin, one must admit it's a
 * *convenient* sin. It's a stark reminder that sometimes, to get the job done, you have to bend
 * the rules until they cry for mercy.
 *
 * FIXME(AI)[DOCS-001]: This entire component is a flagrant violation of the styling architecture
 * defined in AGENT.md, which mandates the exclusive use of Tailwind CSS. This inline <style> block
 * should be dismantled. Custom properties and colors should be moved to `tailwind.config.js`, and
 * animations should be defined as keyframes within the Tailwind configuration. This component is a
 * major piece of technical debt.
 *
 * @dependencies:
 * ➥ react
 *
 * @outputs:
 * ➥ GlobalStyles (component)
 */
import type React from 'react';
import { memo } from 'react';

export const GlobalStyles = memo((): React.ReactElement => {
	const styles = `
        :root {
            --color-aurora-primary: oklch(65% 0.15 190);
            --color-aurora-secondary: oklch(58% 0.17 200);
            --color-aurora-tertiary: oklch(50% 0.19 210);
        }
        html {
            scrollbar-gutter: stable;
            scroll-behavior: smooth;
        }
        body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        body.is-chat-open { 
            overflow: hidden; 
        }
        /* Custom scrollbar styles */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: oklch(5%_0.02_265); }
        ::-webkit-scrollbar-thumb {
            background-color: var(--color-aurora-secondary);
            border-radius: 20px;
            border: 2px solid oklch(5%_0.02_265);
            transition: background-color 0.3s ease-in-out;
        }
        ::-webkit-scrollbar-thumb:hover { background-color: var(--color-aurora-primary); }
        /* Complex animations and pseudo-elements */
        @property --spotlight-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
        }
        @keyframes spin-spotlight-angle {
            from { --spotlight-angle: 0deg; }
            to { --spotlight-angle: 360deg; }
        }
        .aurora-button::after, #chat-panel-container::after {
            content: ''; position: absolute; z-index: -1;
            inset: -250%;
            background: conic-gradient(from var(--spotlight-angle), var(--color-aurora-primary), var(--color-aurora-secondary), var(--color-aurora-tertiary), var(--color-aurora-secondary), var(--color-aurora-primary));
            animation: spin-spotlight-angle 5s linear infinite;
            transition: inset 0.4s ease-in-out;
        }
        .aurora-button:hover::after { inset: -150%; }
        .aurora-button:hover { box-shadow: 0 6px 16px oklch(0% 0 0 / 0.5); }
        .aurora-button:hover .aurora-button-mask { background-color: oklch(5%_0.02_265); }
        /* --- Aurora Effect --- */
        .right-aurora, .left-aurora {
            animation: hue-shifter 20s ease-in-out infinite alternate;
        }
        .right-aurora { animation-name: aurora-animation-right, hue-shifter; }
        .left-aurora { animation-name: aurora-animation-left, hue-shifter; }
        @keyframes hue-shifter {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(-30deg); }
        }
        @keyframes aurora-animation-right {
            0% { transform: translate(45%, -50%) scale(1) rotate(-15deg); }
            50% { transform: translate(43%, -55%) scale(1.1) rotate(-5deg); }
            100% { transform: translate(47%, -48%) scale(1.05) rotate(-10deg); }
        }
        @keyframes aurora-animation-left {
            0% { transform: translate(-45%, -50%) scale(1) rotate(15deg); }
            50% { transform: translate(-43%, -45%) scale(1.1) rotate(5deg); }
            100% { transform: translate(-47%, -48%) scale(1.05) rotate(10deg); }
        }
        /* --- Chat Panel Animations --- */
        #chat-panel-container.is-opening { animation: open-pill-mobile 1.2s forwards cubic-bezier(0.85, 0, 0.15, 1); }
        #chat-panel-container.is-closing { animation: close-pill-mobile 1.2s forwards cubic-bezier(0.85, 0, 0.15, 1); }
        #chat-panel-container.is-open { width: 95vw; height: 90vh; bottom: 30px; }
        @media (min-width: 768px) {
            #chat-panel-container.is-opening { animation-name: open-pill-desktop; }
            #chat-panel-container.is-closing { animation-name: close-pill-desktop; }
            #chat-panel-container.is-open { width: min(90vw, 800px); }
        }
        #chat-panel-container.is-opening .chat-panel-wrapper { animation: fade-in 0.5s 0.6s forwards cubic-bezier(0.25, 1, 0.5, 1); }
        #chat-panel-container.is-open .chat-panel-wrapper { opacity: 1; }
        #chat-panel-container.is-closing .chat-panel-wrapper { animation: fade-out 0.3s forwards; }
        @keyframes open-pill-mobile {
            0% { width: 95vw; height: 50px; }
            50% { width: 95vw; height: 50px; }
            100% { width: 95vw; height: 90vh; bottom: 30px; }
        }
        @keyframes close-pill-mobile {
            0% { width: 95vw; height: 90vh; bottom: 30px; }
            50% { width: 95vw; height: 50px; }
            100% { width: 95vw; height: 50px; }
        }
        @keyframes open-pill-desktop {
            0% { width: 180px; height: 50px; }
            50% { width: min(90vw, 800px); height: 50px; }
            100% { width: min(90vw, 800px); height: 90vh; }
        }
        @keyframes close-pill-desktop {
            0% { width: min(90vw, 800px); height: 90vh; }
            50% { width: min(90vw, 800px); height: 50px; }
            100% { width: 180px; height: 50px; }
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
        /* -- Overlay Animations -- */
        .is-entering { animation: fade-in 0.3s forwards; }
        .is-exiting { animation: fade-out 0.3s forwards; }
        /* -- Logo animation -- */
        @keyframes pulse-3d {
            0%, 100% {
                transform: translateZ(-12px) scale(0.9);
                opacity: 0.5;
            }
            50% {
                transform: translateZ(12px) scale(1.1);
                opacity: 1;
            }
        }
        .animate-pulse-3d {
            animation: pulse-3d 2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        }
        .is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        /* --- Timeline Glow Effect --- */
        .timeline-progress-bar::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 16px;
            height: 16px;
            background: var(--color-aurora-primary);
            border-radius: 50%;
            filter: blur(10px);
            opacity: 0.9;
        }

        /* --- Neon Glass Card --- */
        .neon-glass-card {
            --neon-ease: cubic-bezier(0.5, 1, 0.89, 1);
            --neon-card-radius: 1rem;
            --neon-card-border: 1px;
            --border-color: oklch(20% 0.02 288);
            
            position: relative;
            min-height: 275px;
            border-radius: var(--neon-card-radius);
            border: var(--neon-card-border) solid var(--border-color);
            padding: 1.5rem;
            background: linear-gradient(235deg, color-mix(in oklch, var(--color-aurora-primary) 15%, transparent), transparent 40%), 
                        linear-gradient(135deg, color-mix(in oklch, var(--color-aurora-secondary) 15%, transparent), transparent 40%),
                        oklch(6% 0.02 265 / 0.6);
            backdrop-filter: blur(12px);
            box-shadow: oklch(2% 0.01 265) 0px 10px 16px -8px, oklch(4% 0.01 265) 0px 20px 36px -14px;
        }

        .neon-glass-card .neon-glass-shine,
        .neon-glass-card .neon-glass-glow {
            --glow-color: var(--color-aurora-primary);
            --glow-color-bright: oklch(85% 0.15 190);
        }

        .neon-glass-card .neon-glass-shine-bottom,
        .neon-glass-card .neon-glass-glow-bottom {
            --glow-color: var(--color-aurora-secondary);
            --glow-color-bright: oklch(78% 0.17 200);
            --conic: 135deg;
        }

        .neon-glass-card .neon-glass-shine,
        .neon-glass-card .neon-glass-shine::before,
        .neon-glass-card .neon-glass-shine::after {
            pointer-events: none;
            border-radius: 0;
            border-top-right-radius: inherit;
            border-bottom-left-radius: inherit;
            border: 1px solid transparent;
            width: 75%;
            height: auto;
            min-height: 0px;
            aspect-ratio: 1;
            display: block;
            position: absolute;
            right: calc(var(--neon-card-border) * -1);
            top: calc(var(--neon-card-border) * -1);
            left: auto;
            z-index: 1;
            --start: 12%;
            background: conic-gradient(
                from var(--conic, -45deg) at center in oklch,
                transparent var(--start,0%), var(--glow-color), transparent  var(--end,50%) 
            ) border-box;
            mask: 
                linear-gradient(transparent), 
                linear-gradient(black);
            mask-repeat: no-repeat;
            mask-clip: padding-box, border-box;
            mask-composite: subtract;
        }

        .neon-glass-card .neon-glass-shine::before,
        .neon-glass-card .neon-glass-shine::after {
            content: "";
            width: auto;
            inset: -2px;
            mask: none;
        }
            
        .neon-glass-card .neon-glass-shine::after { 
            z-index: 2;
            --start: 17%;
            --end: 33%;
            background: conic-gradient(
                from var(--conic, -45deg) at center in oklch,
                transparent var(--start,0%), var(--glow-color-bright), transparent var(--end,50%) 
            );
        }

        .neon-glass-card .neon-glass-shine-bottom {
            top: auto;
            bottom: calc(var(--neon-card-border) * -1);
            left: calc(var(--neon-card-border) * -1);
            right: auto;
        }

        .neon-glass-card .neon-glass-glow {
            pointer-events: none;
            border-top-right-radius: calc(var(--neon-card-radius) * 2.5);
            border-bottom-left-radius: calc(var(--neon-card-radius) * 2.5);
            border: calc(var(--neon-card-radius) * 1.25) solid transparent;
            inset: calc(var(--neon-card-radius) * -2);
            width: 75%;
            aspect-ratio: 1;
            display: block;
            position: absolute;
            left: auto;
            bottom: auto;
            mask: url('https://assets.codepen.io/13471/noise-base.png');
            mask-mode: luminance;
            mask-size: 29%;
            opacity: 1;
            filter: blur(12px) saturate(0.8) brightness(0.3);
            mix-blend-mode: plus-lighter;
            z-index: 3;
            transition: filter 0.4s ease-in-out;
        }

        .neon-glass-card:hover .neon-glass-glow {
            filter: blur(12px) saturate(1.25) brightness(0.5);
        }

        .neon-glass-card .neon-glass-glow.neon-glass-glow-bottom {
            inset: calc(var(--neon-card-radius) * -2);
            top: auto;
            right: auto;
        }
        
        .neon-glass-card .neon-glass-glow::before, 
        .neon-glass-card .neon-glass-glow::after {
            content: "";
            position: absolute;
            inset: 0;
            border: inherit;
            border-radius: inherit;
            background: conic-gradient(
                from var(--conic, -45deg) at center in oklch,
                transparent var(--start,0%), var(--glow-color), transparent  var(--end,50%) 
            ) border-box;
            mask: 
                linear-gradient(transparent), 
                linear-gradient(black);
            mask-repeat: no-repeat;
            mask-clip: padding-box, border-box;
            mask-composite: subtract;
            filter: saturate(2) brightness(1);
        }
        
        .neon-glass-card .neon-glass-glow::after {
            --start: 15%;
            --end: 35%;
            border-width: calc(var(--neon-card-radius) * 1.75);
            border-radius: calc(var(--neon-card-radius) * 2.75);
            inset: calc(var(--neon-card-radius) * -0.25);
            z-index: 4;
            opacity: 0.75;
            background: conic-gradient(
                from var(--conic, -45deg) at center in oklch,
                transparent var(--start,0%), var(--glow-color-bright), transparent var(--end,50%) 
            );
        }
        
        .neon-glass-card .neon-glass-glow-bright {
            --start: 13%;
            --end: 37%;
            border-width: 5px;
            border-radius: calc(var(--neon-card-radius) + 2px);
            inset: -7px;
            left: auto;
            filter: blur(2px) brightness(0.4);
            transition: filter 0.4s ease-in-out;
        }

        .neon-glass-card:hover .neon-glass-glow-bright {
            filter: blur(2px) brightness(0.66);
        }

        .neon-glass-card .neon-glass-glow-bright::after {
            content: none;
        }
        
        .neon-glass-card .neon-glass-glow-bright.neon-glass-glow-bottom {
            inset: -7px;
            right: auto;
            top: auto;
        }
        
        @keyframes neon-glass-glow {
            0% { opacity: 0; }
            3% { opacity: 1; }
            10% { opacity: 0; }
            12% { opacity: 0.7; }
            16% { opacity: 0.3; animation-timing-function: var(--neon-ease); }
            100% { opacity: 1; animation-timing-function: var(--neon-ease); }
        }

        .neon-glass-card .neon-glass-glow,
        .neon-glass-card .neon-glass-shine {
            animation: neon-glass-glow 1s var(--neon-ease) both;
            animation-delay: 0.2s;
        }

        .neon-glass-card .neon-glass-shine {
            animation-delay: 0s;
            animation-duration: 2s;
        }

        .neon-glass-card .neon-glass-glow-bright {
            animation-delay: 0.1s;
            animation-duration: 1.5s;
        }

        .neon-glass-card .neon-glass-shine-bottom {
            animation-delay: 0.1s;
            animation-duration: 1.8s;
        }

        .neon-glass-card .neon-glass-glow-bottom {
            animation-delay: 0.3s;
        }

        .neon-glass-card .neon-glass-glow-bright.neon-glass-glow-bottom {
            animation-delay: 0.3s;
            animation-duration: 1.1s;
        }
    `;
	return <style>{styles}</style>;
});
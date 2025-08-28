/**
 * @file src/scripts/modules/chat-panel.js
 * @version 1.0.1
 * @description Handles the user interface and logic for the interactive chat panel component.
 *
 * @module Modules
 *
 * @summary This module is responsible for managing the state of the chat panel, including
 * toggling its visibility, handling user input, and appending new messages to the DOM. It
 * observes the chat button for clicks and manages all related UI animations and state changes
 * to provide a seamless user experience.
 *
 * @dependencies
 * - None
 *
 * @outputs
 * - Exports the `initChatPanel` function.
 *
 * @changelog
 * - v1.0.1 (2025-08-26): Refactored state classes to `.is-opening`, `.is-closing` for consistency.
 * - v1.0.0 (2025-08-25): File created to encapsulate all logic for the chat component.
 */

let chatAnimationState = 'idle';

/**
 * Sets up event listeners and state management for the chat panel UI.
 */
export function initChatPanel() {
    const chatTrigger = document.getElementById('chat-trigger');
    const chatPanel = document.getElementById('chat-panel-container');
    const closeButton = document.getElementById('close-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const overlay = document.getElementById('page-overlay');

    if (!chatTrigger || !chatPanel || !closeButton || !chatInput || !overlay) {
        console.warn('Chat panel elements not found. Skipping chat panel initialization.');
        return;
    }

    const openChat = () => {
        if (chatAnimationState === 'idle') {
            chatAnimationState = 'opening';
            chatPanel.style.display = 'block';
            chatPanel.classList.add('is-opening');
            document.body.classList.add('is-chat-open');
            overlay.classList.add('is-entering');
            overlay.classList.remove('is-exiting');
        }
    };

    const closeChat = () => {
        if (chatAnimationState === 'open') {
            chatAnimationState = 'closing';
            chatPanel.classList.add('is-closing');
            chatPanel.classList.remove('is-open');
            overlay.classList.add('is-exiting');
            overlay.classList.remove('is-entering');
        }
    };

    chatTrigger.addEventListener('click', openChat);
    closeButton.addEventListener('click', closeChat);

    chatPanel.addEventListener('animationend', (event) => {
        if (event.animationName.startsWith('open-pill')) {
            chatAnimationState = 'open';
            chatPanel.classList.remove('is-opening');
            chatPanel.classList.add('is-open');
            chatInput.focus();
        } else if (event.animationName.startsWith('close-pill')) {
            chatAnimationState = 'idle';
            chatPanel.classList.remove('is-closing');
            chatPanel.style.display = 'none';
            document.body.classList.remove('is-chat-open');
        }
    });
}
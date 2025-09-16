# Animated Pulsing Logo Assets

This file contains all the necessary code to recreate the animated, 3D pulsing logo from the portfolio application. It includes the React component and the required CSS for the animations.

---

## 1. React Component (`AnimatedLogo.tsx`)

This is the self-contained React component that renders the SVG for the logo. It's designed to be easily dropped into any React project.

```tsx
import type React from 'react';
import { memo } from 'react';

interface AnimatedLogoProps {
	className?: string;
}

export const AnimatedLogo = memo(
	({ className = 'w-8 h-8' }: AnimatedLogoProps): React.ReactElement => (
		<div
			className={`${className} flex-shrink-0`}
			style={{ perspective: '500px', transformStyle: 'preserve-3d' }}
		>
			<svg
				viewBox="0 0 48 48"
				className="w-full h-full overflow-visible"
				style={{ transform: 'rotateX(-15deg) rotateY(10deg)' }}
			>
				<g
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				>
					<circle
						className="animate-pulse-3d"
						cx="24"
						cy="24"
						r="6"
						style={{ animationDelay: '0.5s' }}
					></circle>
					<circle
						className="animate-pulse-3d"
						cx="24"
						cy="24"
						r="14"
						style={{ animationDelay: '0.25s' }}
					></circle>
					<circle className="animate-pulse-3d" cx="24" cy="24" r="22"></circle>
				</g>
			</svg>
		</div>
	),
);
```

---

## 2. Required CSS

This CSS block contains the keyframes and the utility class that create the pulsing 3D effect. You'll need to add this to your global stylesheet. If you're using Tailwind CSS, you can add this to your main CSS file or within a `<style>` tag.

```css
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
```

---

## How to Use

1.  **Save the component:** Create a new file (e.g., `AnimatedLogo.tsx`) and paste the React component code into it.
2.  **Add the CSS:** Copy the CSS code into your project's main stylesheet.
3.  **Import and render:** Import the `AnimatedLogo` component into any part of your application where you want it to appear.

```jsx
import { AnimatedLogo } from './path/to/AnimatedLogo';

function MyHeader() {
  return (
    <header>
      <AnimatedLogo className="w-12 h-12" />
      <h1>My Application</h1>
    </header>
  );
}
```

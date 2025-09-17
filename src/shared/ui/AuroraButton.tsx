import type React from "react";
import { memo } from "react";
type AuroraButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export const AuroraButton = memo(
	({
		children,
		className = "",
		...props
	}: AuroraButtonProps): React.ReactElement => {
		return (
			<button
				className={`aurora-button relative overflow-hidden rounded-lg px-6 py-2 text-sm font-medium tracking-widest uppercase text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
				{...props}
			>
				<span className="aurora-button-mask absolute inset-px bg-[oklch(10%_0.02_265)] rounded-[6px] transition-colors duration-300"></span>
				<span className="relative">{children}</span>
			</button>
		);
	},
);

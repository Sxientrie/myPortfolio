import type React from "react";
import type { FormEvent } from "react";
import { memo, useState } from "react";
import { AuroraButton } from "../shared/ui/AuroraButton.tsx";

type FormStatus = "idle" | "submitting" | "success" | "error";
interface CtaSectionProps {
	registerRef: (name: string, el: HTMLElement | null) => void;
}
export const CtaSection = memo(
	({ registerRef }: CtaSectionProps): React.ReactElement => {
		const [name, setName] = useState("");
		const [email, setEmail] = useState("");
		const [message, setMessage] = useState("");
		const [status, setStatus] = useState<FormStatus>("idle");
		const handleSubmit = async (
			event: FormEvent<HTMLFormElement>,
		): Promise<void> => {
			event.preventDefault();
			setStatus("submitting");
			try {
				const response = await fetch("/api/send-email", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, email, message }),
				});
				if (!response.ok) {
					throw new Error("Failed to send message.");
				}
				setStatus("success");
				setName("");
				setEmail("");
				setMessage("");
			} catch (error) {
				console.error(error);
				setStatus("error");
			}
		};
		return (
			// biome-ignore lint/correctness/useUniqueElementIds: This ID is static for navigation purposes.
			<section
				id="contact"
				ref={(el) => registerRef("contact", el)}
				className="text-center py-16 px-8"
			>
				<h2 className="text-3xl font-medium tracking-tighter mb-4">
					Have a Complex Problem?
				</h2>
				<p className="max-w-2xl mx-auto mb-8 text-[oklch(95%_0_0_/_0.7)]">
					I thrive on challenges that require deep thinking and creative
					solutions. If you have a project that needs a developer who isn't
					afraid to dive into the intricate details, let's connect.
				</p>
				{status === "success" ? (
					<p className="text-lg text-green-400">
						Thank you for your message! I'll get back to you shortly.
					</p>
				) : (
					<form onSubmit={handleSubmit} className="max-w-xl mx-auto">
						<div className="flex flex-col gap-4">
							<input
								type="text"
								name="name"
								placeholder="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="bg-[oklch(10.5%_0.02_288)] border border-[oklch(20%_0.02_288)] rounded-lg px-4 py-2 text-[oklch(95%_0_0)] placeholder:text-[oklch(95%_0_0_/_0.4)] focus:outline-none focus:ring-2 focus:ring-[--color-accent-primary]"
							/>
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="bg-[oklch(10.5%_0.02_288)] border border-[oklch(20%_0.02_288)] rounded-lg px-4 py-2 text-[oklch(95%_0_0)] placeholder:text-[oklch(95%_0_0_/_0.4)] focus:outline-none focus:ring-2 focus:ring-[--color-accent-primary]"
							/>
							<textarea
								name="message"
								placeholder="Message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
								rows={4}
								className="bg-[oklch(10.5%_0.02_288)] border border-[oklch(20%_0.02_288)] rounded-lg px-4 py-2 text-[oklch(95%_0_0)] placeholder:text-[oklch(95%_0_0_/_0.4)] focus:outline-none focus:ring-2 focus:ring-[--color-accent-primary]"
							/>
						</div>
						<div className="mt-6">
							<AuroraButton type="submit" disabled={status === "submitting"}>
								{status === "submitting" ? "SENDING..." : "GET IN TOUCH"}
							</AuroraButton>
						</div>
						{status === "error" && (
							<p className="mt-4 text-red-500">
								Something went wrong. Please try again later.
							</p>
						)}
					</form>
				)}
			</section>
		);
	},
);

import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

/**
 * Wrapper component for future scroll animations.
 * Currently serves as a structural container.
 */
export const Reveal: React.FC<RevealProps> = ({ children, width = "fit-content" }) => {
  return (
    <div style={{ position: 'relative', width }}>
      {children}
    </div>
  );
};

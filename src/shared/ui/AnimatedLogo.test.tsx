import { render } from '@testing-library/react';
import { AnimatedLogo } from './AnimatedLogo';
import type React from 'react';

describe('AnimatedLogo', () => {
  it('renders the logo', () => {
    const { container } = render(<AnimatedLogo />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});

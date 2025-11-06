// in components/__tests__/SignOutButton.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SignOutButton } from '../sign-out-button';

describe('SignOutButton', () => {
  it('should render the button with the correct text', () => {
    // 1. Arrange (Set up the component)
    render(<SignOutButton />);

    // 2. Act (Find the element)
    const button = screen.getByRole('button', { name: /sign out/i });

    // 3. Assert (Check if it's correct)
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-destructive'); // Check our shadcn styling
  });
});
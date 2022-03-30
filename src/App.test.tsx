import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('button has correct initial text', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to blue' });
    expect(button).toBeInTheDocument();
  });
  it('button has correct initial color', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to blue' });
    expect(button).toHaveStyle({ backgroundColor: 'red' });
  });
});

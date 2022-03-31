import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

describe('App', () => {
  it('button has correct initial text and color', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to blue' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ backgroundColor: 'red' });

    userEvent.click(button);

    expect(button).toHaveStyle({ backgroundColor: 'blue' });
    expect(button).toHaveTextContent('Change to red');
  });

  it('initial conditions', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to blue' });
    const checkbox = screen.getByRole('checkbox');

    // check that the button starts out enable
    expect(button).toBeEnabled();

    // check that the checkbox starts out unchecked
    expect(checkbox).not.toBeChecked();
  });

  it('Checkbox disables button on first click and enables on second click', () => {
    render(<App />);
    const button = screen.getByRole('button',{name: 'Change to blue'});
    const checkbox = screen.getByRole('checkbox', {name:'Disable button'});

    userEvent.click(checkbox);
    expect(button).toBeDisabled();

    userEvent.click(checkbox);
    expect(button).toBeEnabled();
  });
});

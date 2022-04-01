import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App, replaceCamelWithSpaces } from './App';

describe('App', () => {
  it('button has correct initial text and color', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to MidnightBlue' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

    userEvent.click(button);

    expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' });
    expect(button).toHaveTextContent('Change to MediumVioletRed');
  });

  it('initial conditions', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to MidnightBlue' });
    const checkbox = screen.getByRole('checkbox');

    // check that the button starts out enable
    expect(button).toBeEnabled();

    // check that the checkbox starts out unchecked
    expect(checkbox).not.toBeChecked();
  });

  it('Checkbox disables button on first click and enables on second click', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to MidnightBlue' });
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

    userEvent.click(checkbox);
    expect(button).toBeDisabled();

    userEvent.click(checkbox);
    expect(button).toBeEnabled();
  });

  it('Disable button has gray background and reverts to MediumVioletRed', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to MidnightBlue' });
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

    userEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: 'gray' });

    userEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
  });

  it('Cliked disable button has gray background and reverts to MidnightBlue', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to MidnightBlue' });
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

    userEvent.click(button);

    userEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: 'gray' });

    userEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' });
  });
});

describe('Spaces before camel-case capital letters', () => {
  it('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  it('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  it('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});

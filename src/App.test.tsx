import { background } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App, replaceCamelWithSpaces } from './App';

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
    const button = screen.getByRole('button', { name: 'Change to blue' });
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

    userEvent.click(checkbox);
    expect(button).toBeDisabled();

    userEvent.click(checkbox);
    expect(button).toBeEnabled();
  });

  it('Disable button has gray background and reverts to red', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to blue' });
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

    userEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: 'gray' });

    userEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: 'red' });
  });

  it('Cliked disable button has gray background and reverts to blue', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Change to blue' });
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

    userEvent.click(button);

    userEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: 'gray' });

    userEvent.click(checkbox);
    expect(button).toHaveStyle({ backgroundColor: 'blue' });
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

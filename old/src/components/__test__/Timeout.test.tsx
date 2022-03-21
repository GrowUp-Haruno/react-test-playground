import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRunAllTimers } from '../../JestFunctions/useRunAllTimers';
import { Timeout } from '../Timeout';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

const baseRender = () => {
  render(<Timeout />);

  const button = screen.getByText('Click to trigger timeout');
  const getTimeoutMessage = () => {
    return screen.queryByTestId('timeout-message');
  };

  return { button, getTimeoutMessage };
};

describe('[Click to trigger timeout]ボタンの状態遷移', () => {
  it('ボタンを1回クリック', () => {
    const { button } = baseRender();

    expect(button).toBeEnabled();
    userEvent.click(button);
    expect(button).toBeDisabled();
  });
});

describe('TiemoutMessageの表示', () => {
  it('[Click to trigger timeout]ボタンを1回クリック', () => {
    const { button, getTimeoutMessage } = baseRender();

    expect(getTimeoutMessage()).toBeNull();
    userEvent.click(button);
    expect(getTimeoutMessage()).toHaveTextContent('This will timeout in 5 seconds');
    useRunAllTimers();
    expect(getTimeoutMessage()).toHaveTextContent('Timeout');
  });
});

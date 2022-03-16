import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangeInput } from './ChangeInput';

describe('Buttonコンポーネントテスト', () => {
  it('in初期状態が空白であるか', () => {
    render(<ChangeInput />);

    const input = screen.getByLabelText<HTMLInputElement>('user-name');
    const greeting = screen.getByTestId('change-input-greeting');
    expect(input).toHaveValue('');
    expect(greeting).toHaveTextContent('Welcome, Anonymous User!');
  });

  it('inputに「Haruno」を入力', () => {
    render(<ChangeInput />);

    const input = screen.getByLabelText('user-name');
    const greeting = screen.getByTestId('change-input-greeting');

    // fireEvent.change(input, { target: { value: 'Haruno' } });
    userEvent.type(input, 'Haruno');

    expect(input).toHaveValue('Haruno');
    expect(greeting).toHaveTextContent('Welcome, Haruno!');
  });
});

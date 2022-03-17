import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangeInput } from '../ChangeInput';

describe('Buttonコンポーネントテスト', () => {
  it('初期状態のinputは空白であり、greetingに「Welcome, Anonymous User!」が表示されるか', () => {
    render(<ChangeInput />);
    const input = screen.getByLabelText<HTMLInputElement>('user-name');
    const greeting = screen.getByTestId('change-input-greeting');
    
    expect(input).toHaveValue('');
    expect(greeting).toHaveTextContent('Welcome, Anonymous User!');
  });

  it('inputに「Haruno」を入力すると、greetingに「Welcome, Haruno!」が表示されるか', () => {
    render(<ChangeInput />);
    const input = screen.getByLabelText('user-name');
    const greeting = screen.getByTestId('change-input-greeting');

    // fireEvent.change(input, { target: { value: 'Haruno' } });
    userEvent.type(input, 'Haruno');

    expect(input).toHaveValue('Haruno');
    expect(greeting).toHaveTextContent('Welcome, Haruno!');
  });
});

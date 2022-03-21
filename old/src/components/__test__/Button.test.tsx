import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, ButtonProps } from '../Button';

const defaultProps: ButtonProps = {
  onClick: jest.fn(),
  text: 'Submit',
};

describe('Buttonコンポーネントテスト', () => {
  it('Submitボタンが正しくレンダリングされているか', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByText('Submit');
    expect(button).toBeTruthy();
  });

  it('text propが変わっても正しくレンダリングされるか', () => {
    render(<Button {...defaultProps} text="Go" />);
    const button = screen.getByText('Go');
    expect(button).toBeTruthy();
  });

  it('onClickが正しく動作するか', () => {
    const onClick = jest.fn();
    render(<Button {...defaultProps} onClick={onClick} />);
    const button = screen.getByText(defaultProps.text);
    userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

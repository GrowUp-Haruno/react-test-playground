import { fireEvent, render, screen } from '@testing-library/react';
import { Button, ButtonProps } from './Button';

const defaultProps: ButtonProps = {
  onClick: jest.fn(),
  text: 'Submit',
};

describe('Buttonコンポーネントテスト', () => {
  it('Submitボタンが正しくレンダリングされているか', () => {
    render(<Button {...defaultProps} />);
    const button = screen.queryByText('Submit');
    expect(button).toBeTruthy();
  });

  it('text propが変わっても正しくレンダリングされるか', () => {
    render(<Button {...defaultProps} text="Go" />);
    const button = screen.queryByText('Go');
    expect(button).toBeTruthy();
  });

  it('onClickが正しく動作するか', () => {
    const onClick = jest.fn();
    render(<Button {...defaultProps} onClick={onClick} />);
    const button = screen.queryByText(defaultProps.text);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

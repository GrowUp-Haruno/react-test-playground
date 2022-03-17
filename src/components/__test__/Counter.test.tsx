import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from '../Counter';

const baseRender = () => {
  // 仮のウィンドウタイトルを設定
  global.window.document.title = 'My Awesome App';

  render(<Counter />);
  const count = screen.getByTestId('count');
  const incrementButton = screen.getByText('Increment');
  const checkbox = screen.getByLabelText('Check to display count in document title');
  const getWindowTitle = () => {
    return global.window.document.title;
  };

  return { count, incrementButton, checkbox, getWindowTitle };
};

describe('Counter', () => {
  describe('初期状態', () => {
    it('countは「Clicked 0 time」と表記されるか', () => {
      const { count } = baseRender();
      expect(count).toHaveTextContent('Clicked 0 time');
    });

    it('ウィンドウタイトルは「My Awesome App」と表記されるか', () => {
      const { incrementButton, getWindowTitle } = baseRender();
      userEvent.click(incrementButton);
      expect(getWindowTitle()).toBe('My Awesome App');
    });
  });

  describe('Incrementボタンの動作', () => {
    it('1回クリックすると、「Clicked 1 time」と表記されるか', () => {
      const { count, incrementButton } = baseRender();
      userEvent.click(incrementButton);
      expect(count).toHaveTextContent('Clicked 1 time');
    });

    it('2回クリックすると、「Clicked 2 times」と表記されるか', () => {
      const { count, incrementButton } = baseRender();
      userEvent.click(incrementButton);
      userEvent.click(incrementButton);
      expect(count).toHaveTextContent('Clicked 2 times');
    });
  });

  describe('WindowTitleの動作', () => {
    describe('checkbox: unChecked', () => {
      it('ウィンドウタイトルはcountの影響を受けずに「My Awesome App」と表記されるか', () => {
        const { incrementButton, getWindowTitle } = baseRender();
        userEvent.click(incrementButton);
        expect(getWindowTitle()).toBe('My Awesome App');
      });
    });

    describe('checkbox: checked', () => {
      it('ウィンドウタイトルは「Total number of clicks: 0」と表記されるか', () => {
        const { checkbox, getWindowTitle } = baseRender();
        userEvent.click(checkbox);
        expect(getWindowTitle()).toBe('Total number of clicks: 0');
      });

      it('Incrementボタンを1回クリックすると、windowTitleが「Total number of clicks: 1」と表記されるか', () => {
        const { checkbox, incrementButton, getWindowTitle } = baseRender();
        userEvent.click(incrementButton);
        userEvent.click(checkbox);
        expect(getWindowTitle()).toBe('Total number of clicks: 1');
      });

      it('クリックの順番を逆にしてもwindowTitleの表記に問題がないか', () => {
        const { checkbox, incrementButton, getWindowTitle } = baseRender();
        userEvent.click(checkbox);
        userEvent.click(incrementButton);
        expect(getWindowTitle()).toBe('Total number of clicks: 1');
      });

      it('checkboxを再びunChekedに戻すと、windowTitleは「My Awesome App」に戻るか', () => {
        const { checkbox, getWindowTitle } = baseRender();
        userEvent.click(checkbox);
        userEvent.click(checkbox);
        expect(getWindowTitle()).toBe('My Awesome App');
      });
    });
  });
});

import { act } from 'react-dom/test-utils';

export const useRunAllTimers = () => {
  act(() => {
    jest.runAllTimers();
  });
};

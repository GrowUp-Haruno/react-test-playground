import { useMemo, useState } from 'react';

export const replaceCamelWithSpaces = (colorName: string) => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
};

export function App() {
  const [buttonColor, setButtonColor] = useState<'MediumVioletRed' | 'MidnightBlue'>('MediumVioletRed');
  const [isDisabled, setIsDisabled] = useState(false);

  const newButtonColor = useMemo<'MediumVioletRed' | 'MidnightBlue'>(() => {
    return buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';
  }, [buttonColor]);

  return (
    <div>
      <button
        style={{
          backgroundColor: isDisabled ? 'gray' : buttonColor,
        }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={isDisabled}
      >
        Change to {newButtonColor}
      </button>

      <br />

      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={isDisabled}
        aria-checked={isDisabled}
        onChange={(e) => {
          setIsDisabled(e.target.checked);
        }}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

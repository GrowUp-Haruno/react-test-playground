import { useState } from 'react';

export const ChangeInput = () => {
  const [name, setName] = useState('');
  
  return (
    <div>
      <span data-testid="change-input-greeting">
        Welcome, {name === '' ? 'Anonymous User' : name}!
      </span>
      <br />
      <input
        type="text"
        aria-label="user-name"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

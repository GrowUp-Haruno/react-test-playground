import React, { useState } from 'react';
import { TimeoutMessage } from './TimeoutMessage';

export const Timeout = () => {
  const [hasClicked, setHasClicked] = useState(false);
  return (
    <div>
      <button disabled={hasClicked} onClick={() => setHasClicked(true)}>
        Click to trigger timeout
      </button>
      {hasClicked && <TimeoutMessage />}
    </div>
  );
};

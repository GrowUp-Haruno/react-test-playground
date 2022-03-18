import React, { useCallback, useEffect, useState } from 'react';
import { useAPI } from './hooks/useAPI';

export const Fetch = () => {
  const { response, callAPI } = useAPI();

  return (
    <div>
      {/* <button onClick={() => callAPI('/random')}> */}
      <button onClick={() => callAPI('https://api.chucknorris.io/jokes/random')}>
        Get a Chuck Norris joke
      </button>
      {response.loading && <div data-testid="fetch-loading">Loading...</div>}
      {response.error && <div data-testid="fetch-error">{response.error}</div>}
      {response.success && <div data-testid="fetch-joke">errpr:{response.data.value}</div>}
    </div>
  );
};

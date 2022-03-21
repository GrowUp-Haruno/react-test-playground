import { useState, useCallback, useEffect } from 'react';
import { customFetch, initialResponse } from '../../services/customFetch';

export const useAPI = () => {
  const [response, setResponse] = useState(initialResponse);

  const callAPI = useCallback(async (URL) => {
    setResponse({ ...response, success: false, loading: true });
    setResponse(await customFetch(URL));
  }, []);

  useEffect(() => {
    let abortCtrl = new AbortController();

    return () => {
      abortCtrl.abort();
    };
  }, []);

  return { response, callAPI };
};

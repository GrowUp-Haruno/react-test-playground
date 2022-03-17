import { useState, useCallback, useEffect } from 'react';

export const useAPI = (initialData = null) => {
  const initialState = {
    data: initialData,
    success: false,
    loading: false,
    error: null,
  };

  const [response, setResponse] = useState(initialState);

  const callAPI = useCallback(async (URL, options = { method: 'GET' }) => {
    setResponse({ ...response, success: false, loading: true });
    try {
      const response = await fetch(URL, options);
      if (response.status < 200 || response.status >= 300) throw new Error('Failed to fetch');
      const json = await response.json();
      setResponse({
        data: json,
        success: true,
        loading: false,
        error: null,
      });
    } catch (e) {
      setResponse({
        data: initialData,
        success: false,
        loading: false,
        error: e.message,
      });
    }
  }, []);

  useEffect(() => {
    let abortCtrl = new AbortController();

    return () => {
      abortCtrl.abort();
    };
  }, []);

  return { response, callAPI };
};

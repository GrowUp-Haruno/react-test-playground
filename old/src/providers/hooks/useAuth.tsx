import { useState, useCallback, useEffect } from 'react';
import { customFetch, initialResponse } from '../../services/customFetch';

export const useAuth = () => {
  const [response, setResponse] = useState(initialResponse);

  useEffect(() => {
    let abortCtrl = new AbortController();
    let isMounted = true;
    (async () => {
      const temp = await customFetch('./login');
      if (isMounted) setResponse(temp);
    })();
    return () => {
      abortCtrl.abort();
      isMounted = false;
    };
  }, []);

  return { response };
};

export const initialResponse = {
  data: null,
  success: false,
  loading: false,
  error: null,
};

export const customFetch = async (URL:string) => {
  try {
    const response = await fetch(URL, { method: 'GET' });
    if (response.status < 200 || response.status >= 300) throw new Error('Failed to fetch');
    const json = await response.json();
    return {
      data: json,
      success: true,
      loading: false,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      success: false,
      loading: false,
      error: e.message,
    };
  }
};

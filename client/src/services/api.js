export async function reviewCode(language, code) {
  try {
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language, code })
    });
    
    if (!response.ok) {
      let errorMsg = 'Failed to analyze code.';
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMsg = errorData.error;
        }
      } catch (e) {
        // Use generic error if response is not JSON
      }
      throw new Error(errorMsg);
    }
    
    return await response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please ensure the backend is running.');
    }
    throw error;
  }
}

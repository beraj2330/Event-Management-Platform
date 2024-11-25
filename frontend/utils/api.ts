// utils/api.ts
export const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response.json(); // Returns token and user data
  };

export const fetchProtectedData = async (token : string) => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protected-route`, {
    headers: { Authorization: `Bearer ${token}`},
  });

  if (!response.ok) {
    throw new Error('Failed to fetch protected data');
  }

  return response.json();
}
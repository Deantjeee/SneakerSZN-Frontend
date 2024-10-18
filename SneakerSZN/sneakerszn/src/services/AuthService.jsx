class AuthService {
  async login(email, password) {
    try {
      const response = await fetch('https://localhost:7187/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.token); // Save the token to localStorage
      return data;
    } catch (error) {
      throw new Error(error.message || 'An error occurred during login');
    }
  }

  // Logout method to clear the authentication token
  logout() {
    localStorage.removeItem('accessToken'); // Remove the token from localStorage
  }

  // Check if the user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('accessToken'); // Returns true if a token exists
  }

  // Get the current token
  getToken() {
    return localStorage.getItem('accessToken');
  }
}

export default new AuthService();
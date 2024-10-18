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
      localStorage.setItem('accessToken', data.token); 
      return data;
    } catch (error) {
      throw new Error(error.message || 'An error occurred during login');
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  isAuthenticated() {
    return !!localStorage.getItem('accessToken'); 
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }
}

export default new AuthService();
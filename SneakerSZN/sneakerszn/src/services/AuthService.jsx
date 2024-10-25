class AuthService {

  async getUserRoles() {
    const token = localStorage.getItem('token'); 

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('https://localhost:7187/api/User/roles', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return response.json(); // Return an array of roles
    } else {
      throw new Error('Failed to fetch user roles');
    }
  }
  
  async getUserInfo() {

    try {
      const token = localStorage.getItem('token'); 

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('https://localhost:7187/api/User/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user information');
      }

      const data = await response.json();
      return data; 

    } catch (error) {
      throw new Error(error.message || 'An error occurred while fetching user information');
    }
  }

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
      localStorage.setItem('token', data.accessToken); 
      return data;
    } catch (error) {
      throw new Error(error.message || 'An error occurred during login');
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token'); 
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

export default new AuthService();
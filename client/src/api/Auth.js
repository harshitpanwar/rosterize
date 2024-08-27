import axios from '../utils/axiosConfig';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post('/auth/login', {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error?.message || 'Login failed');
    
  }
};

export const me = async () => {
  try {
    const response = await axios.get('/user/me');
    return response.data; 
  } catch (error) {
    throw new Error(error.message || 'User not found');
  }
}

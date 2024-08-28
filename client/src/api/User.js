import axios from '../utils/axiosConfig';

export const createUser = async (user) => {
    try {
        const response = await axios.post('/user/create', user);
        return response.data;
    }
    catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to create user');
    }
}

export const listUsers = async () => {
    try {
        const response = await axios.get('/user/list');
        return response.data;
    }
    catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to list users');
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`/user/delete/${id}`);
        return response.data;
    }
    catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to delete user');
    }
}

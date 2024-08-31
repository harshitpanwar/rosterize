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

export const getUser = async (id) => {
    try {
        const response = await axios.get(`/user/get/${id}`);
        return response.data;
    }
    catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to get user');
    }
}

export const updateUser = async (id, user) => {
    try {

        console.log('user', user);
        const response = await axios.post(`/user/update/${id}`, user);
        return response.data;
    }
    catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to update user');
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

export const clockIn = async({time}) => {
    try {
        const payload = {clockInTime: time};
        const response = await axios.post(`/user/clockin`, payload);
        return response.data;
        
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to check in');
    }
}

export const clockOut = async({time}) => {
    try {
        const payload = {clockOutTime: time};
        const response = await axios.post(`/user/clockout`, payload);
        return response.data;
        
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to check out');
    }
}

export const getClockInOutStatus = async () => {
    try {
        const response = await axios.get('/user/loginstatus');
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to get clock in/out status');
    }
}

export const getClockInFromToDate = async ({from, to}) => {
    try {
        const response = await axios.get(`/user/getclockinfromtodate?from=${from}&to=${to}`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to get clock in/out status');
    }
}

export const getAllStatusMessages = async () => {
    try {
        const response = await axios.get(`/user/getallstatusmessages`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to get all status messages');
    }
}

export const setStatus = async ({status, message}) => {
    try {
        const response = await axios.post(`/user/setstatus`, {status, message});
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to set status');
    }
}

export const getStatus = async () => {
    try {
        const response = await axios.get(`/user/getstatus`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to get status');
    }
}

export const applyLeave = async ({from, to, reason, type}) => {
    try {
        const response = await axios.post(`/user/applyleave`, {from, to, reason, type});
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to apply leave');
    }
}

export const submitReview = async ({title, review, rating}) => {
    try {
        const response = await axios.post(`/user/submitreview`, {title, review, rating});
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message || 'Failed to submit review');
    }
}
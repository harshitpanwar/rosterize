import axios from '../utils/axiosConfig';

export const getCompany = async (company_id) => {
    try {
        const response = await axios.get(`/company/${company_id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error fetching companies');
    }
}

export const createCompany = async ({ name, address, email, phone, password, UEN, employeeCount, industry, website, message }) => {
    try {
        const response = await axios.post('/company', {
            name,
            address,
            email,
            phone,
            password,
            UEN,
            employeeCount,
            industry,
            website,
            message
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error?.message || 'Error creating company');
    }
}

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

export const list = async ({email}) => {
    try {
        const response = await axios.get(`/company/list?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error fetching companies');
    }
}

export const updateCompany = async ({ company_id, name, address, updatedBy, phone, UEN, employeeCount, industry, message, website }) => {
    try {

        console.log('company_id', company_id);
        console.log(name, address, phone, UEN, updatedBy, employeeCount, industry, message, website);

        const response = await axios.put(`/companyadmin/${company_id}`, {
            name,
            address,
            phone,
            UEN,
            email,
            industry,
            website
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error updating company');
    }
}

export const updateCompanyStatus = async ({ company_id, status }) => {
    try {
        const response = await axios.post(`/company/status`, { status, company_id });
        return response.data;
    } catch (error) {
        throw new Error(error.message || 'Error updating company status');
    }
}

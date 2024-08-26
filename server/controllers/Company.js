const Company = require('../models/Company');
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    getCompany: async(req, res) => {

        const company_id = req.params.company_id;

        const company = await Company.findById(company_id);

        if (!company) {
            res.status(404).send('Company not found')
        } else {
            res.send(company);
        }
    },
    postCompany: async(req, res) => {

        try {
            const { name, address, email, phone, password, UEN, employeeCount, industry, message } = req.body;

            if(!name || !address || !email || !phone || !password || !UEN || !employeeCount || !industry || !message) {
                res.status(400).send('Please provide all required fields');
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // create user and company in a single transaction    
            const user = new User({
                email,
                password: hashedPassword,
                role: 'companyadmin',
                status: 'active'
            });

            const savedUser = await user.save();

            const company = new Company({
                name,
                address,
                phone,
                UEN,
                employeeCount,
                industry,
                message,
                createdBy: savedUser._id,
                status: 'pending'
            });

            const savedCompany = await company.save();

            res.send(savedCompany);
    
        } catch (error) {
            res.status(500).send(error.message || 'Error creating company');
        }


    },
    putCompany: async (req, res) => {
        
        const company_id = req.params.company_id

        const { name, address, email, phone, password, UEN, employeeCount, industry, message } = req.body

        const updatedCompany = await Company.findByIdAndUpdate(company_id, {
            name,
            address,
            email,
            phone,
            password,
            UEN,
            employeeCount,
            industry,
            message
        }, { new: true });

        if (!updatedCompany) {
            res.status(500).send('Error updating company')
        }
        res.send(updatedCompany);

    },
    deleteCompany: async(req, res) => {
            
            const company_id = req.params.company_id
    
            const deletedCompany = await Company.findByIdAndDelete(company_id);
    
            if (!deletedCompany) {
                res.status(500).send('Error deleting company')
            }
            res.send(deletedCompany);
    }
}
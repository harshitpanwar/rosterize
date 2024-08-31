const Company = require('../models/Company');
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    getCompany: async(req, res) => {
        try {
            const company_id = req.params.company_id;
            const company = await Company.findById(company_id).populate('createdBy');
    
            if (!company) {
                res.status(404).send('Company not found')
            } else {
                res.send(company);
            }
    
        } catch (error) {
            return res.status(500).send(error.message || 'Error fetching company');
        }
    },
    postCompany: async(req, res) => {

        try {
            const { name, address, email, phone, password, UEN, employeeCount, industry, website, message } = req.body;

            if(!name || !address || !email || !phone || !password || !UEN || !employeeCount || !industry || !website || !message) {
                res.status(400).send('Please provide all required fields');
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
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

            await User.findByIdAndUpdate(savedUser._id, { company: savedCompany._id });

            res.send(savedCompany);
    
        } catch (error) {
            res.status(500).send(error.message || 'Error creating company');
        }


    },
    updateCompany: async (req, res) => {

        try {

            console.log(req.body);
            const company_id = req.params.company_id;
            const user_id = req.user._id;
            const { name, address, phone, UEN, email, employeeCount, industry, message, website } = req.body
            const updatedCompany = await Company.findByIdAndUpdate(company_id, {
                name,
                address,
                phone,
                UEN,
                employeeCount,
                industry,
                message,
                website
            }, { new: true });

            if (!updatedCompany) {
                res.status(500).send('Error updating company')
            }
            const updatedUser = await User.findByIdAndUpdate(user_id, { email }, { new: true });

            if(!updatedUser) {
                res.status(500).send('Error updating user')
            }
            res.send(updatedCompany);

        } catch (error) {
            return res.status(500).send(error.message || 'Error updating company');
        }
    },
    deleteCompany: async(req, res) => {
            
            const company_id = req.params.company_id
    
            const deletedCompany = await Company.findByIdAndDelete(company_id);
    
            if (!deletedCompany) {
                res.status(500).send('Error deleting company')
            }
            res.send(deletedCompany);
    },
    list: async(req, res) => {
        try {
            const {email} = req.query;
            const findCondition = {
                role: 'companyadmin'
            };
            if(email && email!="") {
                findCondition.email = {
                    $regex: `^${email}`,
                    $options: 'i'
                }
            }
            // in the created by field, search for the email id

            const companies = await User.find(findCondition).populate('company');

            // const companies = await Company.find().populate('createdBy');
            res.send(companies);
        } catch (error) {
            res.status(500).send(error.message || 'Error fetching companies');
        }

    },
    updateCompanyStatus: async(req, res) => {
        try {
            const { company_id, status } = req.body;
            const updatedCompany = await Company.findByIdAndUpdate(company_id, { status }, { new: true });
            if (!updatedCompany) {
                return res.status(500).send('Error updating company status')
            }
            return res.send(updatedCompany);
        } catch (error) {
            res.status(500).send(error.message || 'Error updating company status');
        }
    }
}
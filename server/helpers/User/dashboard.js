const User = require('../../models/User');
const Leave = require('../../models/Leave');
const Company = require('../../models/Company');
const Review = require('../../models/Review');

module.exports = {

    superAdmin: async function () {

        try {

            const companiesCount = await Company.find({status: 'approved'}).countDocuments();
            const comaniesToApprove = await Company.find({status: 'pending'}).countDocuments();
            const reviewCount = await Review.find().countDocuments();

            return {
                companiesCount,
                comaniesToApprove,
                reviewCount
            }

        } catch (error) {
            return error.message;
        }

    },
    companyAdmin: async function (userId, companyId) {

        try {

            const userCount = await User.find({ 
                company: companyId, 
                role: {
                    $in: ['user', 'departmenthead']
                } 
            }).countDocuments();
            // console.log('userCount', userCount);

            // get count of all leaves in the company where current date is between the start and end date of leave or on the start date of leave or on the end date of leave
            const leaveCount = await Leave.find({ company: companyId, startDate: { $lte: new Date() }, endDate: { $gte: new Date() } }).countDocuments();

            const medicalLeaveCount = await Leave.find({ company: companyId, leaveType: 'medical', startDate: { $lte: new Date() }, endDate: { $gte: new Date() } }).countDocuments();

            const annualLeaveCount = await Leave.find({ company: companyId, leaveType: 'annual', startDate: { $lte: new Date() }, endDate: { $gte: new Date() } }).countDocuments();


            return {
                userCount,
                leaveCount,
                medicalLeaveCount,
                annualLeaveCount
            }


            
        } catch (error) {
            return error.message;
        }

    },
    departmentHead: async function () {
    
        try {
            
        } catch (error) {
            
        }
    
    },
    user: async function () {
    
        try {
            
        } catch (error) {
            
        }
    
    }


}
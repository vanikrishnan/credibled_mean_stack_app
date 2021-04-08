const User = require('../models/user');

console.log('in controller')
//create a account for user
const create = (req, res, next) => {
    console.log('User creation', JSON.stringify(req.body));
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        country: req.body.country,
        countryCode: req.body.countryCode,
        phone: req.body.phone,
        organization: req.body.organization,
        staffNos: req.body.staffNos,
        agreeCheck: req.body.agreeCheck
    })
    user.save()
    .then(response => {
        console.log('Account Created');
        res.json({
            message: 'Account created successfully',
            id: response._id
        })
    })
    .catch(error => {
        res.json({
            message: 'Something wrong'
        })
    })
}

//Update an account for user
const update = (req, res, next) => {
    console.log('Update User');
    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        country: req.body.country,
        countryCode: req.body.countryCode,
        phone: req.body.phone,
        organization: req.body.organization,
        staffNos: req.body.staffNos
    }
    User.findByIdAndUpdate(req.body.id, {$set: user})
    .then(response => {
        res.json({
            message: 'Account updated successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'Something wrong'
        })
    })
}

//Get user by ID
const fetchUserByID = (req, res, next) => {
    console.log('Fetching User..'+ JSON.stringify(req.body));
    User.findById(req.body.id)
    .then(response => {
        let userData = {
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            country: response.country,
            countryCode: response.countryCode,
            phone: response.phone,
            organization: response.organization,
            staffNos: response.staffNos
        }
        res.json({
            message: userData
        })
    })
    .catch(error => {
    console.log('Error Fetching User..' + error);
        res.json({
            message: 'Something wrong'
        })
    })
}

//Get All Users
const fetchUsers = (req, res, next) => {
    console.log('Fetching User List..');
    User.find()
    .then(response => {
        res.json({
            message: response
        })
    })
    .catch(error => {
    console.log('Error Fetching User List..' + error);
        res.json({
            message: 'Something wrong'
        })
    })
}

module.exports = {
    create, update, fetchUserByID, fetchUsers
}
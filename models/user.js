const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    country: {
        type: String
    },
    countryCode: {
        type: String
    },
    phone: {
        type: String
    },
    organization: {
        type: String
    },
    staffNos: {
        type: Number
    },
    agreeCheck: {
        type: Boolean
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;



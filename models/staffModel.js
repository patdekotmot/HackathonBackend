const mongoose = require('mongoose')
const reg = require('../utils/constant')

const staffSchema = new mongoose.Schema({
    staffId : {
        type: String
    },
    mobile : {
        type: String,
        unique: true,
        // required: true,
        trim: true,
        minlength: 10,
        maxlength: 10,
        validate: {
            validator: (value) => {
                const regex = new RegExp(reg.MOBILE_REGEX);
                return regex.test(value);
            },
        },
    },
    password: {
        type: String,
        default: "SMVDU"
    },
    name: {
        type: String,
        // required: true,
        trim: true,
        minlength: 1,
        maxlength: 256,
    },
    address: {
        type: String,
        // required: true,
        trim: true,
        maxlength: 256,
    },
    joiningDate: {
        type: Date
    }
})

const StaffModel = new mongoose.model("StaffModel", staffSchema)

module.exports = StaffModel
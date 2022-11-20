const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    entryNo : {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    email : {
        type: String
    },
    mobile: {
        type: String
    },
    address : {
        type: String
    },
    parentsName: {
        type: String
    },
    parentsMobile: {
        type: String
    }
})

const StudentModel = new mongoose.model("StudentModel", StudentSchema)

module.exports = StudentModel
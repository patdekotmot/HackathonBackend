const mongoose = require('mongoose')

const outAndBack = new mongoose.Schema({
    entryNo : {
        type: String
    },
    approvedBy : {
        type: String
    },
    takenBy : {
        type: String
    },
    purpose: {
        type: String
    },
    returnDate: {
        type: Date
    },
    outDateTime: {
        type: Date,
        default: Date.now()
    },
    inDateTime: {
        type: Date,
        default: Date.now()
    }
})

const OutAndBack = new mongoose.model("OutAndBack", outAndBack)

module.exports = OutAndBack
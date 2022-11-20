const mongoose = require('mongoose')

const outSchema = new mongoose.Schema({
    entryNo : {
        type: String
    },
    approvedBy : {
        type: String
    },
    purpose: {
        type: String
    },
    returnDate: {
        type: Date
    },
    outDateTime: {
        type: String,
        default: Date.now()
    }
})

const OutModel = new mongoose.model("OutModel", outSchema)

module.exports = OutModel
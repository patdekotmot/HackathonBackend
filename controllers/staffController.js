const StaffModel = require('../models/staffModel')
const studentModel = require('../models/studentModel')
const OutModel = require('../models/outOnly')
const OutAndBack = require('../models/outAndBack')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const StudentModel = require('../models/studentModel')
require('dotenv').config()

const addStaff = async(req, res) => {
    const staff = await StaffModel.create(req.body)

    if(!staff){
        res.status(200).json({
            bill
        })
        return (
            res.status(204).json({
                message: "Staff Not Found",
                success: false
            })
        )
    }

    return (
        res.status(200).json({
            data: staff,
            success: true
        })
    )
}

const getStaff = async (req, res) => {
    // const staffId = req.params.staffId
    // console.log(staffId)

    var staffId;

    console.log(req.headers.authorization.split(' ')[1])

    jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET , (error, decodedInfo) => {
        if(error){
            console.log(error)
            return (
                res.status(200).json({
                    message: "No Staff Found",
                    success: true
                })
            )
        }else{
            console.log(decodedInfo)
            staffId = decodedInfo.staff.staffId
        }
    })
    const staff = await StaffModel.findOne({ staffId })
    if(!staff){
        return (
            res.status(200).json({
                message: "No Staff Found",
                success: true
            })
        )
    }

    return (
        res.status(200).json({
            data: staff,
            success: true
        })
    )

    
}

const updateStaff = async (req, res) => {
    // pass
}

const registerStaff = async (req, res) => {
    const body = req.body

    const staffId = body.staffId
    const staff = await StaffModel.findOne({ staffId })

    if(!staff){
        return (
            res.status(200).json({
                message: "No Staff Found",
                success: true
            })
        )
    }

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(body.password, salt)

    body.password = hashPass
    console.log(body.password)


    const update = await StaffModel.updateOne({ staffId }, { ...body })

    if (!update || !update.modifiedCount) {
        return (
            res.status(404).json({
                message: "Staff Not Registered",
                success: false
            })
        )
    }

    const token = jwt.sign( {staff}, process.env.TOKEN_SECRET)

    res.header("auth-token", token).json({
        token: token,
        success: true,
        status: 200
    })
}

const loginStaff = async (req, res) => {
    console.log("Login IN req to the server")
    const body = req.body
    const staffId = body.staffId

    console.log(body.staffId, body.password)

    const staff = await StaffModel.findOne({ staffId })

    if(!staff){
        return (
            res.status(200).json({
                message: "No Staff Found",
                success: true
            })
        )
    }

    const validPass = await bcrypt.compare(body.password, staff.password)

    if(!validPass){
        return (
            res.status(400).json({
                message: "Incorrect Password"
            })
        )
    }

    console.log(staff)
    const token = jwt.sign( {staff}, process.env.TOKEN_SECRET)

    res.header("auth-token", token).json({
        token: token,
        success: true,
        status: 200
    })
}

const logoutStaff = async (req, res) => {

}

const addStudent = async (req, res) => {
    const student = await StudentModel.create(req.body)

    if(!student){
        return (
            res.status(204).json({
                message: "Student Not Added",
                success: false
            })
        )
    }

    return (
        res.status(200).json({
            data: student,
            success: true
        })
    )
}

const getOut = async (req, res) => {
    const {entryNo, staffId, returnDate, purpose} = req.body

    // check if student exists

    const student = await StudentModel.findOne({entryNo})
    console.log(student)
    if(!student){
        return (
            res.status(204).json({
                message: "Student doesn't exists",
                success: false
            })
        )
    }

    // check if not already out

    const check = await OutModel.find({entryNo})

    console.log(check)

    if(check.length > 0){
        return (
            res.status(200).json({
                message: "Already Out",
                success: false
            })
        )
    }

    const out = await OutModel.create(req.body)

    console.log(out)
    if(!out){
        return (
            res.status(204).json({
                message: "Can't Let Out",
                success: false
            })
        )
    }

    return (
        res.status(200).json({
            data: out,
            success: true
        })
    )
}

const getIn = async (req, res) => {
    const {entryNo, takenBy} = req.body

    // check if out or not

    const check = await OutModel.find({entryNo})

    console.log(check)

    if(check.length === 0){
        return (
            res.status(200).json({
                message: "Already In",
                success: false
            })
        )
    }

    const outAndBackObject = {
        entryNo: check[0].entryNo,
        approvedBy: check[0].approvedBy,
        purpose: check[0].purpose,
        returnDate: check[0].returnDate,
        outDateTime: check[0].outDateTime,
        takenBy: takenBy
    }

    const outAndBackQuery = await OutAndBack.create(outAndBackObject)

    console.log(outAndBackQuery)

    if(outAndBackQuery.length === 0){
        return (
            res.status(200).json({
                message: "Could not In",
                success: false
            })
        )
    }

    const deleteQuery = await OutModel.deleteOne({entryNo})

    console.log(deleteQuery)

    if(deleteQuery.length === 0){
        return (
            res.status(200).json({
                message: "Could not Delete from Out table",
                success: false
            })
        )
    }

    return (
        res.status(200).json({
            message: "In Successfully",
            success: true
        })
    )
}

module.exports = { addStaff, getStaff, updateStaff, registerStaff, loginStaff, logoutStaff, addStudent, getOut, getIn }
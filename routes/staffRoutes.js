const express = require('express')
const { addStaff, getStaff, updateStaff, registerStaff, loginStaff, logoutStaff, addStudent, getOut, getIn } = require('../controllers/staffController')

const app = express()

app.post('/add/staff', addStaff)
app.get('/staff/', getStaff)
app.put('/update/staff', updateStaff)

app.put('/register/staff', registerStaff)
app.post('/login/staff', loginStaff)
app.post('/logout/staff', logoutStaff)

app.post('/add/student', addStudent)

app.post('/getOut/student', getOut)
app.post('/getIn/student', getIn)

module.exports = app

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZiI6eyJfaWQiOiI2Mzc3MjJiYWE2OGEyYzI5YzhiNDY4YzUiLCJzdGFmZklkIjoiMjBiY3MwNTMiLCJtb2JpbGUiOiI5NzA4Mzk1MTYxIiwibmFtZSI6IlJhbUxhbCIsIl9fdiI6MCwicGFzc3dvcmQiOiIkMmEkMTAkSjdKVjh3Q2hkTnJCUVlWSGREeWVnT2ZRdmJTVTcueW5KNDAuZnluUm1CVXBBaVB0ZlZQTkMifSwiaWF0IjoxNjY4OTExODA2fQ.Xyo9zW94FNHMyaoDBYBszi9Ey0BkNPWBxyXk8I1s-a0
const express = require('express')
const cors = require('cors')

const dbCon = require('./utils/dbConnection')
const routes = require('./routes/staffRoutes')

require('dotenv').config()


dbCon()
const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on PORT : ` + process.env.PORT || 3000)
})
const mongoose =  require('mongoose')
require('dotenv').config()

const dbCon = async () => {
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;
    const cluster = process.env.CLUSTER;
    const dbname = process.env.DBNAME;

    mongoose.connect(
        `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.log("Connected to MongoDb successfully");
    }).catch((e) => {
        console.log(e);
    })
}

module.exports = dbCon

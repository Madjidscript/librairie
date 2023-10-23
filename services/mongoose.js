require('dotenv').config()
const mongooose = require("mongoose")
connectdb().catch((e)=>console.log(e))

async function connectdb(){
    await mongooose.connect(process.env.Mongo_url)
    console.log('connection effectuer a la bd avec succes');
}

module.exports = {
    connectdb
}
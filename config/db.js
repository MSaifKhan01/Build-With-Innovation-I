const mongoose=require("mongoose")

require("dotenv").config()

const DBConnection= mongoose.connect(process.env.mongoUrl)


module.exports={DBConnection}
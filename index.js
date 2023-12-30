const express=require("express")

const app=express()

const cors=require("cors")
const { DBConnection } = require("./config/db")
const { UserRouter } = require("./Routers/user")
app.use(cors())
app.use(express.json())

app.use("/user",UserRouter)




app.listen(5038,async()=>{

    try {
        await DBConnection
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("running server")
})
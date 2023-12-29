const express=require("express")
const bcrypt=require("bcrypt")

const { UserModel } = require("../Model/user.model");
const fs=require("fs")
const multer=require("multer");
const { s3 } = require("../config/S3_Config");
require("dotenv").config()

const UserRouter=express.Router()

const uploadFun= multer({dest:"ImagesFolder/"})


UserRouter.post("/Signup",uploadFun.single("Image"), async (req,res)=>{

    
    const {email,phoneNumber,name,password,Role}=req.body
    try {
        
        if(!email && !phoneNumber){
            return res.status(400).send("You need to provide at least email or phoneNumber, or both");

        }
        const userFind= await UserModel.findOne({$or:[{email},{phoneNumber}]})
        if(userFind){
            return res.status(409).send("User already exists. Please login directly.");
        }

        const contentFile= fs.readFileSync(req.file.path)
        console.log("gfg",contentFile)

        const S3Params={
            Bucket:process.env.S3bucketName,
            Key:`${req.file.originalname}`,
            Body:contentFile
        }

        console.log(S3Params)
        s3.upload(S3Params,async(err,data)=>{
            if(err){
                console.log("err",err)

                res.status(500).send("Some Internal server Error")
            }else{
               
                const ImageUrl= data.Location
                console.log("ImaGEuRL",ImageUrl)
                const hashedPassword= await bcrypt.hash(password,5)

        const NewUser= new UserModel({
            email,phoneNumber,name,profileImage:ImageUrl,password:hashedPassword,Role


        })

        await NewUser.save()

        res.status(201).send("you Are Registered Successfully")
            }

        })

        



    } catch (error) {

        res.status(400).send(error.message)
        
    }
})


module.exports={UserRouter}
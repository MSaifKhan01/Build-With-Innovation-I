const express=require("express")
const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")

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



UserRouter.post("/Login", async(req,res)=>{

    const {email,phoneNumber,password}=req.body

    try {
        if(!(email || phoneNumber)){
            return res.status(400).send("You need to provide at least email or phoneNumber,");
        }

        if(!password){
            return res.status(400).send("You need to provide password");
        }

        const UserPresent= await UserModel.findOne({$or:[{email},{phoneNumber}]})
        if(UserPresent){
            bcrypt.compare(password,UserPresent.password,(err,result)=>{
                if(result){
                    const Token= jwt.sign({"userID":UserPresent._id,"role":UserPresent.Role},process.env.JWT_Secret,{expiresIn:"3h"})

                    return res.status(201).send({ "msg": "login succesfully","name":UserPresent.name,UserPresent, "token": Token,"role":UserPresent.Role})
                }else{
                    return res.status(400).send("password not matched")
                }
            })

        }else{
            return res.status(404).send("You need to SignUp First")
        }




        
    } catch (error) {
        res.status(400).send(error.message)
    }

})


UserRouter.put("/update/:id",uploadFun.single("Image"), async(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    try {

        let UserData= await UserModel.findById(id)
        console.log(UserData)
        if(!UserData){
            return res.status(404).send("Data Not found")
        }
        const updatedContent= fs.readFileSync(req.file.path)

        const UpadteParams={
            Bucket:process.env.S3bucketName,
            Key:`${req.file.originalname}`,
            Body:updatedContent
        }

        s3.upload(UpadteParams, async(err,data)=>{
            if(err){
                console.log("err",err)

                res.status(500).send("Some Internal server Error")
            }else{
                const ImageUrl=data.Location
                console.log(ImageUrl)

                const updatedContentforDB={
                    name:name,
                    profileImage:ImageUrl

                }

                const newUpdateData= await UserModel.findByIdAndUpdate(id,updatedContentforDB)

                return res.status(200).send({ message: "User Data Updated Successfully", data: newUpdateData });
            }
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }

})

UserRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        let UserData= await UserModel.findById(id)
        console.log(UserData)
        if(!UserData){
            return res.status(404).send("Data Not found")
        }

        const S3DeleteParams={
            Bucket:process.env.S3bucketName,
            Key:`${UserData.profileImage}`
        }
       let S3dataDelete= await s3.deleteObject(S3DeleteParams).promise()
       console.log("here",S3dataDelete)

       let DeletedData=await UserModel.findByIdAndDelete({_id:id})

       res.status(204).send({ message: "File deleted successfully!",DeletedData });
        
    } catch (error) {
        res.status(500).send(error.message)
        
    }
})

UserRouter.get("/All-Users",async(req,res)=>{
    try {
        const UserData= await UserModel.find()
        if(UserData.length==0){
            return res.status(404).send("No Users Data Available")
        }
        return res.status(200).send(UserData)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

UserRouter.get("/Specific-User/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const UserData= await UserModel.findOne({_id:id})
        if(!UserData){
            return res.status(404).send(" User Not Available")
        }
        return res.status(200).send(UserData)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})


module.exports={UserRouter}
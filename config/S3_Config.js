const AWS=require("aws-sdk")

require("dotenv").config()

AWS.config.update({
    accessKeyId:process.env.S3AccessKeyId,
    secretAccessKey:process.env.S3SecretAccesKey
})

const s3= new AWS.S3()

module.exports={s3}
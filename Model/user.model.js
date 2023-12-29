const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    // required: function () {
    //   return !this.phoneNumber;
    // },
    unique:true
  },

  phoneNumber: {
    type: String,
    // requred: function () {
    //   return !this.email;
    // },
    unique:true
  },
  name: {
    type:String,
    required:true
},
  profileImage: String,
  password: {
    type:String,
    required:true
},

  Role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
});


const UserModel=mongoose.model("User",userSchema)

module.exports={UserModel}
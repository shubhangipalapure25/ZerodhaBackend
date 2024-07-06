const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema =  new mongoose.Schema({
    email:{
        type:String,
        required:[true,'your email address is required'],
        unique:true,
    },
    username:{
        type:String,
        required:[true,'your username is required']
    },
    password:{
        type:String,
        required:[true,'your password is required']
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
    console.log("password in user schema model",this.password);
  });

module.exports = {UserSchema}
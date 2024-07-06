const {UserModel} = require('../model/UserModel');
const bcrypt =require('bcrypt');
const { createSecretToken } = require('../util/SecretToken');

module.exports.Signup= async (req,res,next) => {
try{
let {email,username,password,createdAt} = req.body;
// console.log(email,username,password,createdAt);
const exitingUser = await UserModel.findOne({email:email});

if(exitingUser){
    return res.json({message:'user already exits!'});
}

const user = await UserModel.create({email,username,password,createdAt});

const token = createSecretToken(user._id);

res.cookie("token",token,{
    withCredentials: true,
    httpOnly: false,
})
res.status(201)
.json({message:'User signed in sucessfully..', success:true, user});

next();
}
catch(error){
    console.log(error);
}

}

module.exports.Login= async( req, res, next)=>{
    try{
 const {email,password} = req.body;
 if(!email || !password){
    return res.json({message:'All fields are required'});
 }
 let user = await UserModel.findOne({email});
//  console.log('user login',user);
 if(!user){
    return res.json({message:'incorrect passowrd or email'});
 }

 let auth = await bcrypt.compare(password,user.password)
//  console.log('auth', auth);
 if(!auth){
    return res.json({message:'Incorrect password or email' }) 
 }

 const token = createSecretToken(user._id);
 res.cookie("token",token,{
    withCredentials:true,
    httpOnly:false
 })
 res.status(201).json({message:'User logged in successfully', success:true});
 next();
}catch(error){
    console.log(error);
}
}
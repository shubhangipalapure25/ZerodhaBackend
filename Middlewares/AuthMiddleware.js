const {UserModel} = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res,next) => {
 const token = req.cookies.token;
  console.log('cookies token',req.cookies.token);
  console.log('.env token',process.env.TOKEN_KEY);

  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
        console.log("data : ",data);
      const user = await UserModel.findById(data.id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
//   next();
}
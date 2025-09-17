const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");


const checkUserAuth = async (req, res, next) => {
  //console.log("hello auth")
  //get token
  const {token} = req.cookies;
  if (!token) {
    res.status(401).json({ status: "failed", message: "UnauthorizedLogined" });
  } else {
    const data = jwt.verify(token, "pninfosys123dhdjh");
    // console.log(verifyLogin)
    const userdata = await UserModel.findOne({ _id: data.ID });
    //console.log(userData)
    req.userdata = userdata;

    next(); //next method route pr paucha dega
  }
};




module.exports = checkUserAuth;

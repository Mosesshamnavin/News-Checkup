const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function createUser(req, res, next) {
  try{
const { name, email, phone, password } = req.body;
  const photo = req.file ? req.file.filename : null;
  await User.create({
    name: name,
    email: email,
    phone: phone, 
    password: password,
    photo: photo
  });
      res.status(200).json({
        status: "success",
        message: "Inserted one user",
      });
    }catch(e){
      console.log(e);
      res.status(500).json({ success: false, message: 'An error occurred on the server' });
     }
}

async function getUser(req, res, next){
    try{
      const jwtToken = req.headers["authorization"] || req.body.headers.Authorization;
      const token = jwt.decode(jwtToken);
      const user = await User.findOne({ _id: token._id });
      res.status(200).json({
        status: "success",
        data: user
      });
    }catch(e){
      console.log(e);
      res.status(500).json({ success: false, message: 'An error occurred on the server' });
     }

}

module.exports = {
    createUser,
    getUser
}

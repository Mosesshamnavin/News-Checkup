const User = require("../models/user");

async function createUser(req, res, next) {
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
}

async function getUser(req, res, next){
    // req.params.id
    res.status(200).json({
        status: "success",
        message: "Inserted one user",
      });
}

module.exports = {
    createUser,
    getUser
}

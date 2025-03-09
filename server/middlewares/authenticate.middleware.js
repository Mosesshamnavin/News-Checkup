const jwt = require("jsonwebtoken");
const User = require("../models/user");

function checkJwt(req, res, next) {
  const jwtToken = req.headers["authorization"] || req.body.headers.Authorization;
  if (jwtToken) {
    jwt.verify(jwtToken, process.env.JWT_SECRET, function (err, decoded) {
      if (err) { 
        next(err);
      }else{
      const token = jwt.decode(jwtToken);
      User.findOne({ _id: token._id })
        .then(function (data) {
          if (data != "null") {
            next();
          } else {
            res.status(400).json({
              status: "error",
              message: "Worng Invalid Token",
            });
          }
        })
        .catch((error) => {
          next(error);
        });
      }
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "Jwt Token Missing",
    });
  }
}
module.exports = {
  checkJwt: checkJwt,
};
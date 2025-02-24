const faceapi = require('face-api.js');
const fs = require('fs');
const base64 = require('base64-js');
const path = require('path');
const User = require("../models/user");
const canvas = require("canvas");
var crypto = require("crypto");

const UPLOAD_FOLDER = 'uploads';
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });



const CompareImage = async (req, res, next) => {
  try {
    const data = req.body;
    const imageData = data.image;

    // Decode base64 image
    try {
      const base64Data = imageData.split(',')[1]; // Extract the base64 part
      const imageBytes = Buffer.from(base64Data, 'base64');
      const img = await canvas.loadImage(imageBytes);
      // Convert image to an image object compatible with face-api.js
      const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
      if (!detections) {
        return res.status(400).json({ success: false, message: 'No face detected in the image' });
      }

      const imgEncoding = detections.descriptor;

      // Compare with images in the uploads folder
      let userFound = false;
      let userDetails = null;
      const users = await User.find();

      for (const user of users) {
        const filePath = path.join(UPLOAD_FOLDER, user.photo);
        if (!fs.existsSync(filePath)) continue;

        try {
          const storedImg = await canvas.loadImage(filePath);
          const storedDetections = await faceapi.detectSingleFace(storedImg).withFaceLandmarks().withFaceDescriptor();
          if (!storedDetections) continue;

          const storedImgEncoding = storedDetections.descriptor;

          // Compare face descriptors
          const distance = faceapi.euclideanDistance(imgEncoding, storedImgEncoding);
          if (distance < 0.6) { // Threshold value
            userFound = true;
            userDetails = user;
            break;
          }
        } catch (err) {
          console.error('Error processing stored image:', err);
        }
      }

      if (userFound && userDetails) {
        res.json({
          success: true,
          name: userDetails.name,
          email: userDetails.email,
          phone_number: userDetails.phone_number,
          designation: userDetails.designation,
          photo: userDetails.photo,
        });
      } else {
        res.status(400).json({ success: false, message: 'No matching user found' });
      }

    } catch (err) {
      console.error('Error decoding or processing image:', err);
      res.status(400).json({ success: false, message: 'Invalid image format' });
    }

  } catch (err) {
    console.error('An error occurred:', err);
    res.status(500).json({ success: false, message: 'An error occurred on the server' });
  }
}

const loginController = async (req, res, next) => {
   try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log("user", user);
    if(user == null || !user){
       res.status(404).json({ success: false, message: "User not Found" });
    }else{
    const isAuthenticated = await user.authenticate(password);
    if(isAuthenticated){
      res.status(200).json({ data: user, success: true, message: "Login Sucessfully" })
    }else{
      res.status(401).json({ success: false, message: "Incorrect Password" });
    }
   }

   }catch{
    res.status(500).json({ success: false, message: 'An error occurred on the server' });
   }
}

module.exports = {
    CompareImage,
    loginController
}

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const faceapi = require('face-api.js');
const path = require('path');
const cors = require('cors');
const mongoDBConnection = require("./db");
const user = require("./routes/user");
const login = require("./routes/login");
const factCheck = require("./routes/fact-check");
// const {trainModel } = require("./fact-check/model");
const errorHandler = require("./middlewares/error.middleware");
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static('uploads'))

mongoDBConnection();


// Load face-api.js models (requires models to be downloaded in your project)
const loadModels = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./faceapi-models');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./faceapi-models');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./faceapi-models');
};

app.use("/api/user", user);
app.use("/api/login", login);
app.use("/api/fact-check", factCheck);

app.use(errorHandler);
// app.listen(3001, () => {
//   console.log('Server is running on port 3001');
// });

const startServer = async () => {
    await loadModels();
    // await trainModel();
    app.listen(3001, () => {
      console.log('Server is running on http://localhost:3001');
    });
  };
  
  startServer();

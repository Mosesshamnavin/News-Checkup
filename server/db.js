const mongoose = require("mongoose");
const constant = require("./config/constant");

const mongoDBConnection = () => {
	mongoose.connect(constant.mongo.uri, constant.mongo.options).then(() => {
		console.log("MongoDB Connected!!!");
		return Promise.resolve({});
	});
	mongoose.connection.on("error", err => {
		console.log("Error:::", err);
		process.exit(-1);
	});
};

module.exports = mongoDBConnection
module.exports = {
	mongo: {
		uri: process.env.MONGODB_URI || "mongodb://localhost:27017/ai-tool-model"
	},
	seedDB: true,
};
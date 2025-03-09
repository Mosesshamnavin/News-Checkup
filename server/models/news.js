const mongoose = require("mongoose");
const NewsSchema = new mongoose.Schema({
    article: {
        type: String,
        required: true,
    },
	claims: {
		type: Array,
	},
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'last_updated_at'
	}
})

const News = mongoose.model("News", NewsSchema);
module.exports = News

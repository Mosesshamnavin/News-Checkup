const mongoose = require("mongoose");
var crypto = require("crypto");
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: {
        type: String
    },
    photo: {
        type: String,
        required: true,
    }
  });

  userSchema
	.virtual("password")
	.set(function(password) {
		if (password) {
			this._password = password;
			this.salt = this.makeSalt();
			this.hashed_password = this.encryptPassword(password);
		}
	})
	.get(function() {
		console.log("this", this);
		return this._password;
	});

userSchema.path("hashed_password").validate(hashedPassword => {
	return hashedPassword.length;
}, "Password cannot be blank");

userSchema.methods = {
	authenticate: function(plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},
	makeSalt: () => {
		return crypto.randomBytes(16).toString("base64");
	},
	encryptPassword: function(password) {
		if (!password || !this.salt) return "";
		const saltWithEmail = new Buffer.from(
			this.salt + this.email.toString("base64"),
			"base64"
		);
		return crypto
			.pbkdf2Sync(password, saltWithEmail, 10000, 64, "sha1")
			.toString("base64");
	}
};
  
  const User = mongoose.model("User", userSchema);
  module.exports = User
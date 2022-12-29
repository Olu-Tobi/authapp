import mongoose from "mongoose"
import validator from "validator"

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true, //To update user, remove the required password for Oauth to work
  },
  resetToken: {type: String},
  //update: { type: String },
  validEmail: { type: String, default: "Unverified" },
  emailToken: { type: String },
})


export default mongoose.models.User || mongoose.model("User", userSchema)

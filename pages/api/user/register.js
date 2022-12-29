import connectDB from "../../../connectDB"
import User from "../../../model/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import absoluteUrl from "next-absolute-url"
import { sendEmail } from "../../../helpers/sendMail"

connectDB()


export default async (req, res) => {
    try {
      if (req.method === "POST") {
        const { email, password, firstName, lastName } = req.body
  
        // console.log(email, password, firstName, lastName)
  
        const user = await User.findOne({ email: email })
  
        if (user) {
          return res.status(422).json({ error: "User already exists" })
        }

        if (password.length < 8) {
            return res
            .status(400)
            .json({ error: "Password needs to be at least 8 characters" })
        }
  
        const HashedPassword = await bcrypt.hash(password, 12)
        const newUser = await new User({
          email: email,
          password: HashedPassword,
          name: `${firstName} ${lastName}`,
        }).save()
  
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        })
  
        console.log(token)
  
        newUser.emailToken = token
        await newUser.save()
  
        const { origin } = absoluteUrl(req)
        const link = `${origin}/src/user/email/${token}`
  
        const message = `<div>Click on the button below to verify your email.</div>
        <a href='${link}' style='text-decoration: none; '><button style='background:#19857b; margin-top:2rem; color:white; width:10rem; border:none; border-radius:10px; padding:0.7rem; cursor:pointer;' >Verify Email</button></a>`
  
        // console.log("message", message)
  
        // console.log("here")
  
        await sendEmail({
          to: newUser.email,
          subject: "Email verification",
          text: message,
        })
  
        return res.status(200).json({
          message: `Please check your email to verify your account`,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
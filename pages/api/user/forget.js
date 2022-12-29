import connectDB from "../../../connectDB"
import User from "../../../model/userModel"
import jwt from "jsonwebtoken"
import absoluteUrl from "next-absolute-url"
import { sendEmail } from "../../../helpers/sendMail"


connectDB()

export default async (req, res) => {
  console.log(req.body)

  try {
    if (req.method === "POST") {
      const { email } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        res.status(404).json({ error: "email not found" })
      }

      // console.log(user)

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      })

      // console.log(token)

      user.resetToken = token
      await user.save()

      const { origin } = absoluteUrl(req)
      const link = `${origin}/src/user/reset/${token}`

      const message = `<div>Click on the button below to reset your password.</div>
    <a href='${link}' style='text-decoration: none; '><button style='background:#19857b; margin-top:2rem; color:white; width:10rem; border:none; border-radius:10px; padding:0.7rem; cursor:pointer;' >Reset Password</button></a>`

      // console.log("message", message)

      // console.log("here")

      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: message,
      })
      

      return res.status(200).json({
        message: `Email sent to ${user.email}, please check your email`,
      })
    }
  } catch (error) {
    console.log(error)
  }
}
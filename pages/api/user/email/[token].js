import connectDB from "../../../../connectDB"
import User from "../../../../model/userModel"
import jwt from "jsonwebtoken"


connectDB()

export default async (req, res) => {
  try {
    if (req.method === "PUT") {
      const { token } = req.query

      //console.log(token)

      if (token) {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
      }
      if (!token) {
        return res.status(200).json({ message: "no Token" })
      }

      const user = await User.findById(req.user._id)

      if (user) {
        user.validEmail = "Validated"
        user.emailToken = undefined
        await user.save()

        return res.status(200).json({ message: "Email verification successful" })
      }
    }
  } catch (error) {
    console.log(error)
  }
}
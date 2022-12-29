import connectDB from "../../../connectDB"
import User from "../../../model/userModel"


connectDB()

export default async (req, res) => {

    try {

        if (req.method === "POST"){
            const { email } = req.body

            const user = await User.findOne({ email: email})

            user.password = undefined

            return res.status(200).send(user)
            
        }
      
    } catch (err) {
      console.log(err)
    }
    
    
}
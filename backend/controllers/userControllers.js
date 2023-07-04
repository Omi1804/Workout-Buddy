//using the userModel which created
const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

//creating a function to generate token and using id as a part of payload
const createToken = (_id) => {
    // contains three arguments (first are payloads to include) (second are secret key) and (third are additional options) 
    return jwt.sign({_id}, process.env.SECRET_JWT_KEY, { expiresIn: '3d'})
}


//login user logic
const loginUser = async (req,res) => {

    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        //creating a token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// signup user logic
const signupUser = async(req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.signup(email,password)
        //creating a JWT token 
        const token = createToken(user._id)

        // res.status(200).json({email, user})
        // now we are returning token instead of users 
        res.status(200).json({email, token})
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}




module.exports = {
    signupUser,
    loginUser
}
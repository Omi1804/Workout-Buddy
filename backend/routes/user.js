const express = require('express')
const router = express.Router()
const {loginUser, signupUser} = require('../controllers/userControllers')   //controller funcitons


//both must be a post routes as both are sending the requrest to the server
//login route
router.post('/login' , loginUser)


//signup route
router.post('/signup' ,signupUser)

module.exports = router
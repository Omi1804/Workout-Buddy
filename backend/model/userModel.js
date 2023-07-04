const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        required : true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


// static signup method -->in this funtion arrow funtion does not works
userSchema.statics.signup = async function(email,password){
    
    //firstly we validate the password and email through package validator
    if(!email || !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not Strong Enough') 
    }



    //checking if email already exists
    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already in use')
    }

    //Hashing the passwords
    // -->generating the salt to attach to the back of the password
    const salt= await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt) // --> generating the combined hash of password and salt

    // storing the password and email to the database 
    const user = await this.create({ email, password: hash})

    return user

}


//Static User Login Method
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    
    const user =  await this.findOne({email})

    if(!user){
        throw Error('Incorrect Email')
    }

    // comparing the password which is given at the time and the password whihc is stored in the database for that particular ID 
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user

}



module.exports = mongoose.model('User',userSchema)
const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts.js')
const userRoutes = require('./routes/user.js')
const cors = require('cors')



app.use(cors())
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts' , workoutRoutes)
app.use('/api/user', userRoutes)


//connect to DB
mongoose.connect(process.env.MONGO_URL)
 .then(()=>{
    console.log("Database Connected")
    app.listen(process.env.PORT || 3000 , ()=>{
        console.log("listening on port 3000")
    })
 })
 .catch((err)=>{
    console.log(err)
 })


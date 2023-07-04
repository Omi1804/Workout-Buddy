const express = require('express')
const router = express.Router()
const Workout = require('../model/workoutModels.js')
const {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers.js')

const requireAuth = require('../middleware/requireAuth.js')


// all the logics inside the routes file are in the controller file that why it is created

//require auth for all workout routes
router.use(requireAuth) // --> we only show the data or let the user post the data if the user has been verified
//no whosoever has the valid token can only able to see all the workouts

//Get all the workouts
router.get('/', getAllWorkouts)


//Get single workout
router.get('/:id', getWorkout) 


//Post a new workout
router.post('/' , createWorkout)

//Delete a new workout
router.delete('/:id' , deleteWorkout)

//Update the router
router.patch('/:id' , updateWorkout)



module.exports = router

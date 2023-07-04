import React from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'
import publicRequest from '../requestMethod'

//date fns to improve how date and time is looking
import { formatDistanceToNow } from 'date-fns'

const WorkoutDetails = ({workout}) => {

  
  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  const handleClick = async () =>{

    if(!user){
      return
    }

    try{
    const response = await publicRequest.delete('/workouts/'+ workout._id, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.data

    if(response.status === 200){
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }catch(error) {
    console.log(error)
  }
}

  return (
    <div className='workout-details'>
        <h4 className='title'>{workout.title}</h4>
        <p><strong>Load : </strong>{workout.load} kg</p>
        <p><strong>Reps : </strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix: true})}</p>
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails
import React from 'react'
import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import publicRequest from '../requestMethod'


//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {

    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    // const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {

                const response = await publicRequest.get('/workouts', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.data;

                if (response.status === 200) {
                    // setWorkouts(json)
                    dispatch({ type: 'SET_WORKOUTS', payload: json })
                }
            
            }
            if (user) {
                fetchWorkouts()
            }
    }, [dispatch, user])

    return (
        <div className={workouts && workouts.length !== 0 ? `home` : 'Empty-home'}>
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home
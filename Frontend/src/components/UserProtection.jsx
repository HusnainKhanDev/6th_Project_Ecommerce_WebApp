import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setuser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

const UserProtection = () => {
    const user = useSelector((state) => state.user.user)
    let dispatch = useDispatch()
    let [Loading, setLoading] = useState(true)
    let navigate = useNavigate()

    useEffect(() => {
        if(Object.keys(user).length <= 0) {
            async function fetch() {
                try{
                    let res = await axios.get(`${import.meta.env.VITE_BASE_URL}auth/get/user/`, { withCredentials: true })
                    if(res.status != 200) { navigate('/login')}
                    dispatch(setuser(res.data))
                    setLoading(false)
                }
                catch(error){
                    console.log(error.response?.data)
                }
            }
            fetch()
        }
    }, [])

    if(Loading){
        return <div>

        </div>
    }

  return (
    <div>UserProtection</div>
  )
}

export default UserProtection
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setuser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserProtection = ({ children }) => {
    const user = useSelector((state) => state.user.user)
    let dispatch = useDispatch()
    let [Loading, setLoading] = useState(true)
    let navigate = useNavigate()

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false)
        }

        if (Object.keys(user).length <= 0) {
            async function fetch() {
                try {
                    let res = await axios.get(`${import.meta.env.VITE_BASE_URL}auth/get/user/`, { withCredentials: true })
                    if (res.status != 200) { navigate('/login'); toast.error("UnAuthorized please login"); return }
                    dispatch(setuser(res.data))
                    console.log("from protector", res.data)
                    setLoading(false)
                }
                catch (error) {
                    console.log(error.response?.data)
                    navigate('/login')
                }
            }

            fetch()
        }
    }, [])


    if (Loading) {
        return <div className='w-full h-screen flex flex-col items-center justify-center'>
            <img src="loading.gif" alt="" />
            <h1 className='text-2xl'>Loading...</h1>
        </div>
    }

    return (
        <div>{children}</div>
    )
}

export default UserProtection
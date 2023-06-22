import React, { useState ,useEffect} from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { RegisterUser } from '../apicalls/users'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../redux/loaderSlice'

export default function Register() {
    const [user, setUser] = useState({
        name:"",password:"",email:""
    })
    const dispatch = useDispatch()
    const registerHandler = async () => {
        try {
            dispatch(showLoader())
            const response = await RegisterUser(user)
            dispatch(hideLoader())
            if (response.success)
            {
                toast.success(response.message)
            }
            else {
                toast.error(response.message)
            }
        }
        catch (error)
        {
            dispatch(hideLoader)
               toast.error(error.message)
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token"))
        {
            window.location.href = "/"
        }
    }, [])
  return (
      <div className='h-screen flex justify-center items-center bg-primary'>
          <div className='bg-white shadow-md p-5 flex flex-col gap-5 w-96 rounded-md'>
              <h1 className='text-2xl uppercase font-semibold'>ChatGuru - Register</h1>
              <hr/>
              <input
                  type='text'
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  value={user.name}
                  placeholder="Enter your name" />
              <input
                  type='text'
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                  placeholder="Enter your email" />
              <input
                  type='password'
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  value={user.password}
                  placeholder="Enter your password" />
              <button className='contain-btn' onClick={registerHandler}>Register</button>
              <Link to='/login'
              className='underline'>
                  Already have an account? Login
              </Link>
          </div>
    </div>
  )
}

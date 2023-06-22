import React, { useState ,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../apicalls/users'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../redux/loaderSlice'
function Login() {
    const [user, setUser] = useState({
        password:"",email:""
    })
    const dispatch=useDispatch()
    const navigate= useNavigate()
    const LoginHandler = async() => {
        try {
            dispatch(showLoader())
            const response = await LoginUser(user)
            dispatch(hideLoader())
            if (response.success)
            {
                localStorage.setItem("token", response.data)
                window.location.href = "/"
                 toast.success(response.message)
            }
            else {
             toast.error(response.message)
            }
        }
        catch (error) {
            dispatch(hideLoader())
            toast.error(error.message)
        }
     
    }
    useEffect(() => {
        if (localStorage.getItem("token"))
        {
            navigate("/")
        }
        
    }, [])
  return (
      <div className='h-screen flex justify-center items-center bg-primary'>
          <div className='bg-white shadow-md p-5 flex flex-col gap-5 w-96 rounded-md'>
              <h1 className='text-2xl uppercase font-semibold'>ChatGuru - Login</h1>
              <hr/>
              
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
              <button className='contain-btn' onClick={LoginHandler}>Login</button>
              <Link to='/register'
              className='underline'>
                  Don't have an account? Register
              </Link>
          </div>
    </div>
  )
}

export default Login
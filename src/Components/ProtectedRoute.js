import React, { useEffect} from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { GetCurrentUser, getAllUsers } from '../apicalls/users'
import { setUser, setallUsers,setAllChats } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAllChats } from '../apicalls/chats'
function ProtectedRoute({children}) {
    const navigate = useNavigate()
    const {user}= useSelector(state=> state.userReducer)
   const dispatch=useDispatch()
    const GetCurrentUsers = async ()=>{
        try {
            const response = await GetCurrentUser()
            const allUsersResponse = await getAllUsers()
            const allChatsResponse = await getAllChats()
        if(response.success)
            {
                dispatch(setUser(response.data))
            dispatch(setallUsers(allUsersResponse.data))
            dispatch(setAllChats(allChatsResponse.data))
            }
            else {
                toast.error(response.message)
                navigate("/Login")
            }
        }
        catch (error)
        {
            navigate("/Login")
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token"))
        {
            GetCurrentUsers()
        }
        else {
            navigate("/Login")
        }
    }, [])
    return (
        <div className='h-screen w-screen bg-gray-100 p-2'>
            {/* header */}
            <div className='flex justify-between p-5'>
                <div className='flex items-center gap-1'>
                    <i className="ri-message-2-line text-2xl"></i>
                    <h1 className='text-primary text-2xl uppercase'>chatguru</h1>
            </div>
                <div className='flex gap-1 text-md items-center'>
                    <i className="ri-shield-user-fill"></i>
                    <h1 className='underline'>
                        {user?.name}
                    </h1>
                    <i class="ri-logout-circle-r-line ml-5 text-xl cursor-pointer" onClick={() => {
                        localStorage.removeItem("token")
                        navigate('/login')
                    }}></i>
                </div>
            </div>
            {/* content */}
            <div>{children}</div>  
      </div>
    
         )
       }

export default ProtectedRoute
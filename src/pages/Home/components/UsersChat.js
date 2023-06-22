import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllChats, setSelectedChat } from '../../../redux/userSlice'
import { showLoader } from '../../../redux/loaderSlice'
import { hideLoader } from '../../../redux/loaderSlice'
import { CreateNewChat } from '../../../apicalls/chats'
import { toast } from 'react-hot-toast'
function UsersChat({searchKey}) {
    const { allUsers, allChats, user } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const openChat = (receipentUserId) => {
        const chat = allChats.find((chat) =>
            chat.members.includes(user._id) &&
                chat.members.includes(receipentUserId)
            
        )
        if (chat)
        {
            dispatch(setSelectedChat(chat))
            console.log("chat is opened")
           
            }
    }
    const createNewChat = async (receipentUserId) => {
        try {
            dispatch(showLoader())
            const response = await CreateNewChat([user._id, receipentUserId])
            dispatch(hideLoader())
        if (response.success)
        {
            toast.success(response.message)
            const newChat = response.data
            const updatedChat = [...allChats, newChat]
            dispatch(setAllChats(updatedChat))
            dispatch(setSelectedChat(newChat))
            }
        else {
            dispatch(hideLoader())
            toast.error(response.message)
            }

        }
        catch (error)
        {
            toast.error(error.message)
        }
        
    }
    
  return (
      <div className='flex flex-col gap-3 mt-5'>
          {allUsers.filter((userObj) => 
          (userObj.name.toLowerCase().includes(searchKey.toLowerCase())
              && searchKey)
              || allChats.some((chat)=> chat.members.includes(userObj._id))
          ).map(userObj => {
              return (
                  <div className='shadow-sm border p-5 bg-white rounded-2xl flex justify-between' key={userObj._id} onClick={()=> openChat(userObj._id)}>
                      <div className='flex gap-5 items-center'>
                          {userObj.profilePic && (
                              <img src={ userObj.profilePic} alt='profile Pic' className='rounded-full w-10 h-10'/>
                          )}
                          {!userObj.profilePic && (
                              <div className='rounded-full bg-gray-500 flex items-center justify-center h-10 w-10'>
                                  <h1 className='text-2xl font-semibold uppercase text-white'>{userObj.name[0]}</h1>
                                  </div>
                          )}
                          <h1>{userObj.name}</h1>
                           </div>
                          <div onClick={()=> createNewChat(userObj._id)}>
                          
                       {!allChats.find((chat)=> chat.members.includes(userObj._id)) && (<button className='border-primary border bg-white text-primary p-2 rounded'>Create Chat</button>)}
                         
                      </div>
                      
                      </div>
              )
          })}
    </div>
  )
}

export default UsersChat
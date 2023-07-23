import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllChats, setSelectedChat } from '../../../redux/userSlice'
import { showLoader } from '../../../redux/loaderSlice'
import { hideLoader } from '../../../redux/loaderSlice'
import { CreateNewChat } from '../../../apicalls/chats'
import { toast } from 'react-hot-toast'
function UsersChat({searchKey}) {
    const { allUsers, allChats, user,selectedChat} = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const openChat = (receipentUserId) => {
        const chat = allChats.find((chat) =>
            chat.members.map((mem)=> mem._id).includes(user._id) &&
                chat.members.map((mem)=>mem._id).includes(receipentUserId)
            
        )
        if (chat)
        {
            dispatch(setSelectedChat(chat))
            
            }
    }
    const createNewChat = async(receipentUserId) => {
        try {
            dispatch(showLoader())
            const response = await CreateNewChat([user._id, receipentUserId])
            console.log(response)
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
            
            toast.error(response.message)
            }

        }
        catch (error)
        {
            dispatch(hideLoader())
            toast.error(error.message)
        }
        
    }
    const getData = () => {
        return allUsers.filter((userObj) => 
          (userObj.name.toLowerCase().includes(searchKey.toLowerCase())
              && searchKey)
              || allChats.some((chat)=> chat.members.map((mem)=>mem._id).includes(userObj._id))
          )
    }
    const getISelectedOrNot = (userObj) => {
        if (selectedChat) {
            return selectedChat.members.map((mem)=>mem._id).includes(userObj._id)
        }
        return false
    }
  return (
      <div className='flex flex-col gap-3 mt-5'>
          {getData().map((userObj) => {
              return (
                  <div className={`shadow-sm border p-3 bg-white rounded-xl flex justify-between cursor-pointer ${getISelectedOrNot(userObj) && 'border-primary border-2'}`} key={userObj._id} onClick={()=> openChat(userObj._id)}>
                      <div className='flex gap-5 items-center'>
                          {userObj.profilePic && (
                              <img src={ userObj.profilePic} alt='profile Pic' className='rounded-full w-10 h-10'/>
                          )}
                          {!userObj.profilePic && (
                              <div className='rounded-full bg-gray-500 flex items-center justify-center h-10 w-10'>
                                  <h1 className='text-xl font-semibold uppercase text-white'>{userObj.name[0]}</h1>
                                  </div>
                          )}
                          <h1>{userObj.name}</h1>
                           </div>
                          <div onClick={()=> createNewChat(userObj._id)}>
                          
                       {!allChats.find((chat)=> chat.members.map((mem)=>mem._id).includes(userObj._id)) && (<button className='border-primary border bg-white text-primary p-2 rounded'>Create Chat</button>)}
                         
                      </div>
                      
                      </div>
              )
          })}
    </div>
  )
}

export default UsersChat
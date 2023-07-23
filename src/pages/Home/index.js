import React, { useState } from 'react'
import UserSearch from './components/UserSearch'
import ChatArea from './components/ChatArea'
import UsersChat from './components/UsersChat'
import { useSelector } from 'react-redux'

function Home() {
  const [searchKey, setsearchKey] = useState("")
  const {selectedChat} = useSelector((state) =>state.userReducer)
  return (
    <div className='flex gap-5'>
      {/* first part */}
      <div className='w-96'>
        <UserSearch searchKey={searchKey} setsearchKey={setsearchKey} />
        <UsersChat searchKey={searchKey} />
      </div>
      {/* second part */}
      { selectedChat && <div className='w-full'>
         <ChatArea />
      </div>}
    </div>
  )
}

export default Home
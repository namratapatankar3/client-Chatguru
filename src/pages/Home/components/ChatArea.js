
import { useSelector } from 'react-redux'

function ChatArea() {
  const { selectedChat, user } = useSelector((state) => state.userReducer)

  const recipentuser = selectedChat.members.find((mem) => mem._id !== user._id)
      console.log(recipentuser.name.charAt(0))
  return (
    <div className='bg-white h-[85vh] border rounded-2xl w-full flex flex-col justify-between p-5'>
      {/* first part recipent user */}
      <div>
         <div className='flex gap-5 items-center mb-5'>
                          {recipentuser.profilePic && (
                              <img src={ recipentuser.profilePic} alt='profile Pic' className='rounded-full w-10 h-10'/>
                          )}
                          {!recipentuser.profilePic && (
                              <div className='rounded-full bg-gray-500 flex items-center justify-center h-10 w-10'>
                                  <h1 className='text-xl font-semibold uppercase text-white'>{recipentuser.name[0]}</h1>
                                  </div>
                          )}
          <h1 className='uppercase'>{recipentuser.name}</h1>
        </div>
        <hr/>
      </div>
      {/* chats messages */}
      <div>
        messages
      </div>
      {/* chat input */}
      <div>
        <div className='h-14 rounded-xl border-gray-300 shadow border flex justify-between p-2 items-center'>
          <input type='text' placeholder='Type a message' className='w-[90%] rounded-xl focus:border-none border-0 h-full ' />
          <button className='bg-primary text-white h-max p-2 rounded'>
            SEND
          </button>
        </div>
      </div>
  </div>
    
  )
}

export default ChatArea
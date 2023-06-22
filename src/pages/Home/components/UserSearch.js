import React from 'react'

function UserSearch({searchkey, setsearchKey}) {
  return (
      <div className='relative'>
          <input type='text' placeholder='Search texts / chats' className='rounded-full w-full border-gray-500 pl-10 text-gray-500' value={searchkey} onChange={(e) => setsearchKey(e.target.value)} />
          <i class="ri-search-line absolute top-2 left-4 text-gray-400"></i>
      </div>
  )
}

export default UserSearch
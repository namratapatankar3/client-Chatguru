import { axiosInstance } from "."

export const getAllChats = async () => {
    try {
        const response = await axiosInstance.get('api/chats/get-all-chats')
        return response.data
    }
    catch (error)
    {
        throw error
    }
}

export const CreateNewChat = async (members) => {
    try {
        const response = await axiosInstance.post('api/chats/create-new-chat', {
            members
        })
      return response.data
    }
    catch (error) {
        throw error
    }
}
import { useSelector } from "react-redux"
export function useLastMessage(params) {
    const {chatId,lastMessage} = useSelector( state => state.lastMessage)
    return{
        chatId,
        lastMessage
    }
}
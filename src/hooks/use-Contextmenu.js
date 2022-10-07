import { useSelector } from "react-redux";

export function useContextmenu(params) {
    const {x,y,open,messageId,chatId} = useSelector( state => state.contextmenu)
    return{
       x,
       y,
       open,
       messageId,
       chatId
    }
}

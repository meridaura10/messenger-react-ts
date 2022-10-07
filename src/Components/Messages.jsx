import React, { useRef } from 'react'
import { db } from '../firebase'
import { onValue, ref } from 'firebase/database'
import { useEffect } from 'react'
import { useState } from 'react'
import Messeg from './Messeg'
import { getLocalStorage} from '../utils/localstorage'
import { sortMessag } from '../utils/sortMessag'


function Messages({chatId}) {
    const [messages, setMessages] = useState([])
    const refinput = useRef()
    const myId = getLocalStorage('store').id
    useEffect( () =>{
        onValue(ref(db, `chat/${chatId}/messages`), DataSnapshot  =>{
          const messagesdata = DataSnapshot.val()
          setMessages(          messagesdata ?
            Object.keys(messagesdata).map(key =>({
                ...messagesdata[key],
            }))
             : [])
        })
      },[chatId] )
     
      useEffect( () =>{
        setTimeout(() => {
          const listMessages = refinput.current
          listMessages.scrollTop  = listMessages.scrollHeight
        });    
       },[messages, chatId] ) 
       sortMessag(messages)
  return (
   <div className='wrap-messages'>
       <div ref={refinput}  className='list-messages'>
        {messages.length > 0 ? messages.map(messeg => {
          if (messeg.userId === myId) {
            return <Messeg chatId={chatId}  key={messeg.id} messeg={messeg} myMesseg={true} />
          } else {
            return <Messeg chatId={chatId} key={messeg.id} messeg={messeg} myMesseg={false} />
          }
        }): ""}
       </div>
    </div>
  )
}

export default Messages
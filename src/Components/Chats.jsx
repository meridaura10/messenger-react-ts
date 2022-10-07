import React from 'react';
import { useState } from 'react';
import { getLocalStorage } from '../utils/localstorage';
import MyChats from './MyChats';
import ChatSearch from './ChatSearch';

function Chats({chat}) {
    const [toggleChat,setToggleChat] = useState(true)
     const myId = getLocalStorage('store').id
     function linkToChat(id1,id2) {
      let chatId = ''
      if (id1 > id2) { 
        chatId = id1 + id2
      return chatId
    }else{
        chatId = id2 + id1
      return chatId
    }
    }
  return (
    <>
      <div className='sidebarOverlay'>
      <div className="sidebar">
        <div className='sidebar__btn'>
          <button onClick={() => {setToggleChat(false)}}  className={`sidebar__btn-item ${toggleChat ? '' : 'active'}`}>знайти чат</button>
          <button onClick={() => {setToggleChat(true)}} className={`sidebar__btn-item  ${toggleChat ? 'active' : ''}`}>мої чати</button>
        </div>
        <div className="chats">
            <ul className={`chats__list ${toggleChat ? '': "reverse"}`}>    
               {toggleChat ? <MyChats linkToChat={linkToChat} myId={myId}/> : <ChatSearch linkToChat={linkToChat} myId={myId} />}
            </ul>
          </div>
         </div>
         {
          chat && chat
         }
      </div>
    </>
  )
}

export default Chats
import React, { useEffect, useState } from 'react'
import { ref } from 'firebase/database';
import {db, writeToUsersChats} from '../firebase'
import { onValue } from 'firebase/database';
import { getLocalStorage } from '../utils/localstorage';
import CheckMark from '../elements/Svg/CheckMark';
import { Link } from 'react-router-dom';
import { SortUsersSearch } from '../utils/SortUsersSearch';

function ChatSearch({myId,linkToChat}) {
  const [users,setUser] = useState([])
  const myInfo = getLocalStorage(`store`)
  useEffect( () =>{
  onValue(ref(db,`users`), snapshot =>{
    const users = snapshot.val()
    if (users) {
      setUser(users ?  Object.keys(users).map(key =>({
        ...users[key],
        id: key
    })): [])
    }
  })
},[] )
  return (
                        users.length > 0 ? users.map( (users) => myId !== users.id &&  <div onClick={() =>{writeToUsersChats({myId,myInfo, users})}} 
                        className={`chat-wrap chat-wrap-search ${users.chats && myId == Object.keys(users.chats).filter(e => e == myId) ? `activeChat` : ''}`}
                         key={users.token}>                        
                      <li  className='chats__item'  >
                  {users.img ?
                  <>
                                      <img className='chats__img' src={users.img} alt="" />
                  </>
                :
                    ''
                }
                <div className='chats__name-wrap'>
                <p className='chats__name'>
                    {users.name}
                  </p>
                </div>
                {users.chats && myId == Object.keys(users.chats).filter(e => e == myId) ? <div className='Mark'><CheckMark  /></div> : ''}  
                </li>   
                {users.chats && myId == Object.keys(users.chats).filter(e => e == myId) ?                 <div className='sidebarUsers'>
                  <Link to={`/chats/${linkToChat(myId,users.id)}`} className='sidebarUsers-btn-wrap'><button className='sidebarUsers-btn'>go chat</button></Link>
                </div> : ''}
              </div> 
              ) : <div className='chats-loager-wrap'><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
  )
}

export default ChatSearch
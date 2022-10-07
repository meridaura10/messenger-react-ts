import React, { useEffect, useState } from 'react'
import { ref, remove } from 'firebase/database';
import {db} from '../firebase'
import { onValue } from 'firebase/database';
import { NavLink, useNavigate} from 'react-router-dom';
import { sortUsers } from '../utils/sortUsers';

function MyChats({myId, linkToChat}) {
  const navigate = useNavigate()
  const [users,setUser] = useState([])
  const [thereUsers,setThereUsers] = useState(true)
  useEffect( () =>{
  onValue(ref(db,`usersChat/${myId}`), snapshot =>{
    setThereUsers(snapshot.exists());
    const users = snapshot.val()
      setUser(users ?  Object.keys(users).map(key =>({
        ...users[key],
        id: key
    })): [])
  })
},[] )
  sortUsers(users)

  return (
    thereUsers ?                    users.length > 0 ? users.map( (users) => myId !== users.id && <div className='chat-wrap' key={users.token}>                         
    <NavLink  className="link__user" to={`/chats/${linkToChat(myId,users.id)}`}><li  className='chats__item'  >
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
<div   className='chats__last-message'>
 {users.lastMessag ?                    users.lastMessag.img ?       <div className='lastMessage-photo-text-wrap'>   
 <img className='lastMessage-photo' src={users.lastMessag.img.slice(-1)} alt="" />
<span className='lastMessage__photo'>фото</span>
</div> :  users.lastMessag.text : ''}
</div>
</div>
</li>   </NavLink>
</div>) :  <div className='chats-loager-wrap'><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div> : <p className='textToNoChat'>у вас не має чатів але ви можете написати комусь перейшовши до вкладки  "знайти чат"</p>

  )
}

export default MyChats
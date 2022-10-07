import React, { useRef } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Messages from './Messages'
import {writeLastAction, writeToDatabaseLastMessag, writeToDatabaseMessag} from '../firebase'
import { getLocalStorage } from '../utils/localstorage'
import { uid } from 'uid'
import Chats from './Chats'
import { useEffect } from 'react'
import { onValue, ref, remove } from 'firebase/database'
import { db } from '../firebase'
import EmojiPicker from 'emoji-picker-react';
import Voice from './Voice'
import Delete from '../elements/Svg/Delete'
import ArrowLeft from '../elements/Svg/ArrowLeft'
function ChatsPeople() {
    const navPath = useLocation()
    const navigate = useNavigate()
    const [value,setValue] = useState('')
    const [emojiActive,setEmojiActive] = useState(false)
    const [file,setFile] = useState([])
    const [user, setUser] = useState(null)
    const refInput = useRef()
    const [btnDisabled, setBtnDisabled] = useState(true)
    const chatId = navPath.pathname.replaceAll('chats', '').replaceAll('/', '')
    const myId = getLocalStorage('store').id
    const youId = chatId.replaceAll(myId, "")
    function goBack() {
      navigate('/chats')
    }
    function submit(event) {
       event.preventDefault()
        focusInput()
        let id = uid()
        const date = new Date()
        const messagDate = date.toLocaleDateString()
        const messagTime = date.toLocaleTimeString()
        const text = value.replace(/\s+/g, ' ').trim()
        const message = {
          id,
          text,
          chatId,
          img: file,
          userId: myId,
          messagDate,
          messagTime
        }
        writeToDatabaseMessag({
          id,
          text,
          chatId,
          img: file,
          userId: myId,
          messagDate,
          messagTime
        })
        writeLastAction({
          youId,
          myId,
          messagDate,
          messagTime
        })
          writeToDatabaseLastMessag({
           myId,
           youId,
           lastMessage: message
          })
        setValue('')
        setFile([])
        setBtnDisabled(true)
        setEmojiActive(false)
    }
    useEffect(() =>{
      let userId = chatId.replaceAll(`${myId}`, '')
      onValue(ref(db, `usersChat/${myId}/${userId}`), DataSnapshot  =>{
        const infoUser = DataSnapshot.val()
        setUser(infoUser)
      })
    },[navPath,chatId,myId])
    function inputDisabledBtn(e) {
      if (e.target.value) {
        setBtnDisabled(false)
      } else {
        setBtnDisabled(true)
      }
    }
    const addFile = (e) =>{

        if (!e.target.files) {
          return
        }
        const files = Array.from(e.target.files)
        files.forEach( (file) =>{
          if (!file.type.match('image')) {
            return
        }

        const reader = new FileReader()

        reader.onload = ev =>{  
            const src = ev.target.result
            setFile(current => [...current,src])
        }
        reader.readAsDataURL(file)
        } )
    }
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
    const saveEmoji = (e) =>{
      focusInput()
      if (e.emoji) {
        setBtnDisabled(false)
      } else {
        setBtnDisabled(true)
      }
      setValue(current => [...current, e.emoji].join(''))
     }
     const focusInput =() =>{
      refInput.current.focus()
     }
     const deleteChat = (myId,userId) =>{
      remove(ref(db,`usersChat/${myId}/${userId}`))
      remove(ref(db,`usersChat/${userId}/${myId}`))
      remove(ref(db,`users/${userId}/chats/${myId}/`))
      remove(ref(db,`users/${myId}/chats/${userId}/`))
      remove(ref(db,`chat/${linkToChat(myId,userId)}`))
      navigate(`/chats`)
    }
  return (
    <>
        <div className='content'>
          {user ?  <Chats
           chat =
          {
            <div className="peopleChats">
                <div className="container-peopleChats">
                  <div className='header-people'>
                  <div className="userInfo">
                       
                       <div onClick={() => goBack()} className="arrowGoBack">
                         <ArrowLeft  />
                       </div> 
                  {
                  user ? 
                      <>
                      <div className="chats__item">
                          <img className='info__user-img' src={user.img || 'https://cdn-icons-png.flaticon.com/512/6665/6665325.png'} alt="" />
                          <p className='chats__name'>{user.name}</p>
                      </div> 
                      <div onClick={() =>{window.confirm(`ви точно хотіте удалить чат c "${user.name}"`) && deleteChat(myId,user.id)}} className='delete'><Delete /></div>
                      </>
                      : 
                      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                  }
                  </div>
                  </div>
                  <Messages chatId={chatId} />
                    <div className="wrap-form">
                        <div className={` ${emojiActive ? 'activeEmoji' : 'disabledEmoji'}`}>
                            {emojiActive ?   <EmojiPicker  Theme='auto'  autoFocusSearch={false} width={320} height={400} onEmojiClick={saveEmoji} /> : ''}
                         </div>
                        <form className='chat-form' onSubmit={submit} onInput={inputDisabledBtn}>
                              <div onClick={focusInput} className='emoji-img-wrap'><img  className='emoji-img' onClick={() => {emojiActive ? setEmojiActive(false)  : setEmojiActive(true) }}  src="https://cdn-icons-png.flaticon.com/512/2455/2455132.png" alt="" /></div>
                              <input ref={refInput}  placeholder='messages' className='form__input' value={value} onChange={e => setValue(e.target.value)}   type="text" />
                              <div className='file'>
                                 <input  type="file" id='file' onInput={addFile} multiple={true} accept="image/png, image/gif, image/jpeg"/>
                                 <label className='label-file' htmlFor="file"><img className='file__img' src="https://cdn-icons-png.flaticon.com/512/3767/3767084.png" alt="" /></label>
                              </div>
                              <div> 
                                {/* <Voice /> */}
                              </div>
                              <button disabled={file.length > 0 ? false : btnDisabled}className='form__btn btn' type='submit'>відправити</button>
                        </form>
                    </div>
                </div>
            </div> 
        }
         /> : <Chats
         chat = ''
         />}
        </div>
    </>
  )
}

export default ChatsPeople
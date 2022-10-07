import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setOpneContextmenu } from '../store/slices/contextmenu'

function Messeg({messeg,myMesseg,chatId}) {
  const messagDate =  messeg.messagTime.substr(0,5)
  const dispatch = useDispatch()
  const openContextmenu = (e,messageId) =>{
    e.preventDefault()
    dispatch(setOpneContextmenu({
      x: e.clientX,
      y: e.clientY,
      open: true,
      messageId,
      chatId
    }))
  }
  return (
    <>
        {myMesseg ? 
            <div onContextMenu={(e) => openContextmenu(e,messeg.id)} className="messag-container-right">
                  <div  className="message message-my ">
                  <div className='message-content'>
                        <div className='message__img-wrap'>{messeg.img ? messeg.img.map((img,index) => <div key={index} className='img-wrap'><img  src={img} className='messeg__img'  alt="" /></div>) : ''}</div>
                        <p className="message-text">{messeg.text}</p>
                        <p className="message-time message-time-my">{messagDate}</p>
                    </div>
                    {messeg.reactions &&
                      <div className='reactions'>
                        {Object.keys(messeg.reactions).map(e => e)}
                      </div>
                    }
                </div>    
            </div>
            :  
            <div className="messag-container-left">
                  <div  className="message">
                  <div className='message-content'>
                        <div className='message__img-wrap'>{messeg.img ? messeg.img.map(img => <div className='img-wrap' key={img}><img  src={img} className='messeg__img'  alt="" /></div>) : ''}</div>
                        <p className="message-text">{messeg.text}</p>
                        <p className="message-time message-time-my">{messagDate}</p>
                    </div>
                </div>    
            </div>
      }
    </>
  )
}

export default Messeg



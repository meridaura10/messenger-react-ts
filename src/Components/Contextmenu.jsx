import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useContextmenu } from '../hooks/use-Contextmenu'
import { setOpneContextmenu } from '../store/slices/contextmenu'
import { ReactionBarSelector } from '@charkour/react-reactions';
import { setReactions } from '../firebase';

function Contextmenu() {
  const dispatch = useDispatch()
  const optionsContextmenu = useContextmenu()
  const hiddenContextmenu = (e) =>{
    e.target.dataset.hidden && dispatch(setOpneContextmenu({
      open: false
    }))
  }
  const saveReactions = (item) =>{
      setReactions({
        chatId: optionsContextmenu.chatId,
        reactionsItem: item,
        messageId: optionsContextmenu.messageId,
      })
  }
  return (
    optionsContextmenu.open && <div onClick={hiddenContextmenu} data-hidden='overlay' className="contextmenu-wrap" style={{
      position: 'fixed',
      top: '0px',
      left: '0px',
      right: '0px',
      bottom: '0px',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: '1000',
      padding: '30px',
    }}>
      
                  <div  style={{
                    marginLeft: `calc(${optionsContextmenu.x}px - 200px)`,
                    marginTop: `calc(${optionsContextmenu.y}px - 130px)`,
                    zIndex: '2000',
                    display: 'flex',
                  }} className='contextmenu'>
                      <ReactionBarSelector onSelect={saveReactions} 
                      reactions={[
                        {
                          node: <div>😄</div>, key: "😄",
                        },
                        {
                          node: <div>😂</div>, key: "😂",
                        },
                        {
                          node: <div>🥰</div>, key: "🥰",
                        },
                        {
                          node: <div>❤️</div>, key: "❤️",
                        },
                        {
                          node: <div>😡</div>, key: "😡",
                        }
                      ]}
                      iconSize={20} style={{
                        border: 'none',
                        fontSize: '0px',
                        display: 'grid',
                        background: 'rgb(28,21,28)',
                        background: 'linear-gradient(90deg, rgba(28,21,28,1) 0%, rgba(45,25,35,0.98) 50%, rgba(28,21,28,1) 100%)',
                        paddingRight: '7px',
                        height: '100%',
                        padding: '0px',
                        width: '30px',
                        justifyContent: 'center'                      
                      }} /> 
                  <div  className='interactionButtonsWithMessages'>
                      <button className='interactionButtonsWithMessages__item'>копіювати</button>
                      <button className='interactionButtonsWithMessages__item'>відправити</button>
                      <button className='interactionButtonsWithMessages__item'>відповісти</button>
                      <button className='interactionButtonsWithMessages__item'>видалити</button>
                  </div>
                  </div>
    </div>
  )
}

export default Contextmenu
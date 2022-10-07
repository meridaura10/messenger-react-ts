import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/constants'
import {useAuth} from '../hooks/use-auth'
import { removeUser } from '../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import Contextmenu from './Contextmenu'

function NavBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userDate = useAuth()
  const user = userDate.isAuth
  function singOut(a) {
    if (a !== true) {
      navigate('/login')  
      dispatch(removeUser({
        email: null,
        id: null,
        token: null,
        name: null,
        img: null,
      }))
    }
  }
  singOut(true)

  return (
    <>
      {!user ?
          <header className='header'>
           <nav className='header__nav'>
             <div className='header__logo'>
                 <div className="logo">
                     <h1 className='logo__text'>messenger</h1>
                     <img className="logo__img" src="https://cdn-icons-png.flaticon.com/512/1383/1383264.png" alt="" />
                 </div>
             </div>  
             <div className='header__btn'>
                 <NavLink to={LOGIN_ROUTE}>
                     <button className='header__btn btn'>зарегеструватися / ввійти</button>    
                  </NavLink>
             </div>
           </nav>
         </header>
      : <Contextmenu />
    }
    </>
  ) 
}

export default NavBar
import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import {writeToDatabaseUser} from '../firebase'


function Login() {
  const navigate = useNavigate()    
  const auth = getAuth();
  const dispatch = useDispatch()




  function singUp(params) {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const email = user.email
        const id = user.uid
        const token = credential.accessToken
        const name = user.displayName
        const img = user.photoURL
        const userObj = {
          email,
          id,
          token,
          name,
          img
        }
        dispatch(setUser(userObj))
        writeToDatabaseUser(userObj)
        navigate('/chats')
      }).catch((error) => {
        console.log('login error', error);
      });
  }

  return (
    <div className="login">
          <button onClick={singUp} className='logo__btn btn'>ввійти за допомогою google</button>
    </div>
  )
}

export default Login

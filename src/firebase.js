import { initializeApp } from "firebase/app";
import { getDatabase, onValue, update} from 'firebase/database'
import { ref, set } from 'firebase/database';
const app = initializeApp(
    {
    apiKey: "AIzaSyD3snWwYeFUgTckYlZhTYLmtMug98tyvGU",
    authDomain: "messenger-cc08b.firebaseapp.com",
    projectId: "messenger-cc08b",
    storageBucket: "messenger-cc08b.appspot.com",
    messagingSenderId: "592249896099",
    appId: "1:592249896099:web:cce6a00d6ecfc2d2141316"
  }
  );   
export const db = getDatabase(app)

export const writeToDatabaseUser = ({id,name,token,img,email}) =>{
  onValue(ref(db,`users/${id}`), snapshot =>{
    if (!snapshot.exists()) {
      set(ref(db,`users/${id}`),{
        id,name,token,img,email
      })
    }
  })
}
export const writeToDatabaseMessag = (options) =>{
  set(ref(db,`chat/${options.chatId}/messages/${options.id}/`),{
    text: options.text,
    id: options.id,
    userId: options.userId,
    messagDate: options.messagDate,
    messagTime: options.messagTime,
    img: options.img
  })
}
export const writeToDatabaseLastMessag = ({myId,youId,lastMessage}) =>{
  if (lastMessage.img) {
    set(ref(db,`usersChat/${myId}/${youId}/lastMessag/`),{
      id: lastMessage.id,
      messagDate: lastMessage.messagDate,
      messagTime: lastMessage.messagTime,
      text: lastMessage.text,
      userId: lastMessage.userId,
      img: lastMessage.img
    })
    set(ref(db,`usersChat/${youId}/${myId}/lastMessag/`),{
      id: lastMessage.id,
      messagDate: lastMessage.messagDate,
      messagTime: lastMessage.messagTime,
      text: lastMessage.text,
      userId: lastMessage.userId,
      img: lastMessage.img
    })
  }else{
    set(ref(db,`usersChat/${myId}/${youId}/lastMessag/`),{
      id: lastMessage.id,
      messagDate: lastMessage.messagDate,
      messagTime: lastMessage.messagTime,
      text: lastMessage.text,
      userId: lastMessage.userId,
    })
    set(ref(db,`usersChat/${youId}/${myId}/lastMessag/`),{
      id: lastMessage.id,
      messagDate: lastMessage.messagDate,
      messagTime: lastMessage.messagTime,
      text: lastMessage.text,
      userId: lastMessage.userId,
    })
  }
}
export const writeLastAction = ({youId,myId, messagDate,messagTime}) =>{
        set(ref(db,`usersChat/${myId}/${youId}/lastAction/`),{
          messagDate: messagDate,
          messagTime: messagTime,
        })
        set(ref(db,`usersChat/${youId}/${myId}/lastAction/`),{
          messagDate: messagDate,
          messagTime: messagTime,
        })
}
export const writeToUsersChats = ({myId,users,myInfo}) =>{ 
  const date = new Date()
  const usersDate = date.toLocaleDateString()
  const usersTime = date.toLocaleTimeString()
  set(ref(db,`users/${users.id}/lastAction/${myId}/`),{
    messagDate: usersDate,
    messagTime: usersTime,
  })
  set(ref(db,`users/${users.id}/chats/${myId}/`),{
    myId
  })
  set(ref(db,`users/${myId}/chats/${users.id}/`),{
    myId
  })
  let data
  onValue(ref(db,`usersChat/${myId}/${users.id}/`), snapshot =>{
    if (!snapshot.exists()) {
       data = true
    }else{
       data = false
    }
  })
  if (data) {
    set(ref(db,`usersChat/${myId}/${users.id}/`),{
      id: users.id,
      name: users.name,
      token: users.token,
      img: users.img,
      email: users.email,
      lastAction: {
        messagDate: usersDate,
        messagTime: usersTime,
      }
    })
    set(ref(db,`usersChat/${users.id}/${myId}/`),{
      id: myInfo.id,
      name: myInfo.name,
      token: myInfo.token,
      img: myInfo.img,
      email: myInfo.email,
      lastAction: {
        messagDate: usersDate,
        messagTime: usersTime,
      }
    }) 
  }
}
export const setReactions = ({chatId,messageId,reactionsItem}) =>{
  set(ref(db,`/chat/${chatId}/messages/${messageId}/reactions/${reactionsItem}`),reactionsItem)
}

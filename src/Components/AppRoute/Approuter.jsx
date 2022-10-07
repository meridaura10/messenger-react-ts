import React from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import { PublicRouters,PrivatRouters } from '../../route'
import {useAuth} from '../../hooks/use-auth'
function Approuter() {
    const user = useAuth().isAuth

    return user ?
    (   
         <Routes>
            <Route to='/' >
                  {PrivatRouters.map( ({path,element}) => <Route path={path} key={path} element={element}   /> )}
                  <Route
                        path="*"
                        element={<Navigate to="/chats" replace />}
                    />
            </Route>
         </Routes>
    )
    :
    (
        <Routes>
            <Route>
                 {PublicRouters.map( ({path,element}) => <Route path={path} key={path} element={element}  /> )}       
                 <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
            </Route>
        </Routes>
    )
}

export default Approuter
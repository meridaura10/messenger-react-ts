import Chats from "./Components/Chats";
import Login from "./Components/Login";
import ChatsPeople from "./Components/ChatsPeople";
import { CHATS_ROUTE, LOGIN_ROUTE } from "./utils/constants";

export const PublicRouters = [
    {
        path: LOGIN_ROUTE,
        element: <Login />
    },
]

export const PrivatRouters = [
    {
        path: CHATS_ROUTE,
        element: <Chats />
    },
    {
        path: `${CHATS_ROUTE}/:id`,
        element: <ChatsPeople />
    },
]
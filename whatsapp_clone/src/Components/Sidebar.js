import React, { useEffect, useState } from 'react'
import '../Style/style.css'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChats from '../Components/SidebarChats'
import db, {auth} from '../App/firebaseSetup';
import { useStateValue } from '../App/Context'
import { Button } from '@material-ui/core';
import { actionTypes } from '../App/reducer';
import { useHistory } from 'react-router-dom';



function Sidebar() {
   const history = useHistory();
   const [ rooms, setRooms ] = useState([]);
   const [ { user }, dispatch ] = useStateValue();
   const signOut = () => {
      auth.signOut()
      .then(result => {
         dispatch({
            type: actionTypes.outUser,
            user: null
         })
         history.push('/')
      })
      .catch(error => console.log(error));
   }
   useEffect(() => {
      const unsubscribe = db.collection('rooms').onSnapshot(snapshot => {
         setRooms(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
         })))
      });
      return () => {
         unsubscribe();
      }
   }, []);
    return (
        <div className = "sidebar">
            <div className = "sidebar__header">
               <Button onClick = {signOut}><Avatar src = {user.photoURL} /></Button>
               <p className = "sidebar__name">{user.displayName}</p>
               <div className = "sidebar__headerRight">
                  <IconButton>
                    <DonutLargeIcon />
                  </IconButton>
                  <IconButton>
                    <ChatIcon />
                  </IconButton>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
               </div>
            </div>
            <div className = "sidebar__search">
               <div className = "sidebar__searchContainer">
                  <SearchIcon />
                  <input placeholder = "Search or start new chat" type = "text" />
               </div>
            </div>
            <div className = "sidebar__chats">
               <SidebarChats addNewChat />
               {rooms.map(room => (
                  <SidebarChats key = {room.id} id = {room.id} name = {room.data.name} />
               ))}
            </div>
        </div>
    )
}

export default Sidebar

import React, { useEffect, useState } from 'react'
import '../Style/style.css'
import Sidebar from '../Components/Sidebar'
import Chat from '../Components/Chat'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginUser from '../Components/LoginUser'
import { useStateValue } from '../App/Context'


function WhatsAppClone() {
   const [ { user }, dispatch ] = useStateValue();
    return (
        <div className = "the__app">
            {!user ? (
               <LoginUser />
            ) : (
               <div className = "app__body">
                  <Router>
                     <Switch>
                          <Route path = "/rooms/:roomId">
                             <Chat />
                          </Route>
                          <Route path = "/">
                             <Sidebar />
                          </Route>
                     </Switch>
                  </Router>
               </div>
            )}
        </div>
    )
}

export default WhatsAppClone

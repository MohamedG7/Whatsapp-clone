import React from 'react'
import '../Style/style.css'
import { Button } from '@material-ui/core'
import { auth, provider } from '../App/firebaseSetup'
import { useStateValue } from '../App/Context'
import { actionTypes } from '../App/reducer'



function LoginUser() {
    const [ {}, dispatch ] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.setUser,
                user: result.user,
            })
        })
        .catch(error => console.log(error))
    };
    return (
        <div className = "login">
            <div className = "login__container">
               <img src = "https://clipground.com/images/whatsapp-logo-hd-png-10.png" alt = "" />
               <div className = "login__text">
                  <h1>Sign In To WhatsApp</h1>
               </div>
               <Button onClick = {signIn}>
                  Sign In With Google
               </Button>
            </div>
        </div>
    )
}

export default LoginUser

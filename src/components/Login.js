import React from 'react';
import './Login.css';
import { Button } from '@mui/material';
import { provider, auth } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

const Login = () => {

    const [{user}, dispatch] = useStateValue();

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error)=> alert(error.message));
    };

  return (
    <div className='login'>
        <div className='login_container'>
            <img src='https://docs.smooch.io/images/channel-header-logos/logo_whatsapp.png' alt=''/>
            <div className='login_text'>
                <h1>Sign in to WhatsApp</h1>
            </div>
            <Button onClick={signIn}>Sign In With Google</Button>
        </div>  
    </div>
  )
}

export default Login

import React from 'react'
import spotifyLogo from '../../Data/Spotify_Logo_CMYK_Green.png'
import { loginUrl } from '../../spotify';
import "./Login.css";
const Login = () => {
  return (
    <div className='login-component'>
      <img src={spotifyLogo} alt=""/>
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  ) 
}

export default Login
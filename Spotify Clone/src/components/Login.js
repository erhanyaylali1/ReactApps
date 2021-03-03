import React from 'react';
import './styles/Login.css';
import { loginUrl } from '../spotify';

const Login = () => {
	return (
		<div className="login">
			<div className="login__container">
				<img 
					className="spotify__logo"
					src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" 
					alt="spotify-logo" 
				/>
				<a href={loginUrl} className="login__button">LOGIN WITH SPOTIFY</a>
			</div>
		</div>
	)
}

export default Login
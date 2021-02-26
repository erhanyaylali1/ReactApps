import React from 'react';
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { auth, provider } from '../FirebaseConfig';
import { logIn } from '../features/userSlice';

const Login = () => {

	const dispatch = useDispatch();

	const signIn = () => {
		auth.signInWithPopup(provider)
		.then(({user}) =>
			dispatch(logIn({
				displayName: user.displayName,
				email: user.email,
				photo: user.photoURL
			}))
		).catch((error) => alert(error.message));
	}

	return (
		<LoginContainer>  
			<LoginInner>
				<img src="https://logodownload.org/wp-content/uploads/2018/03/gmail-logo-1-1.png"
					alt="gmail" />
				<Button onClick={signIn} variant="contained" color="primary">Sign In</Button>
			</LoginInner>
		</LoginContainer>
	)
}

export default Login;

const LoginContainer = styled.div`
	background-color: #f2f2f2;
	display: grid;
	place-items: center;
	height: 100vh;
`;
const LoginInner = styled.div`
	display: flex;
	flex-direction: column;
	> img {
		height: 200px;
		object-fit: contain;
		margin-bottom: 30px;
	};
	> button {
		width: 50%;
		margin-left: auto;
		margin-right: auto;
	}
`;
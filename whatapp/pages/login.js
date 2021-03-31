import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebaseConfig';

const Login = () => {
	
	const SignIn = () => {
		auth.signInWithPopup(provider)
		.catch((err) => console.log(err))
	}
	
	return (
		<Container>
			<InnerContainer>
				<Logo src="https://insupam.com/wp-content/uploads/2020/01/whatsapp-logo-icon.png" />
				<ButtonDiv 
					variant="outlined"
					onClick={SignIn}
				>
					Sign In With Google
				</ButtonDiv> 
			</InnerContainer>
		</Container>
	)
}

export default Login

const Logo = styled.img`
	height: 150px;
	width: 150px;
	margin-bottom: 20px;
`
const ButtonDiv = styled(Button)`
	width: 100%;
`
const InnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 100px;
	box-shadow: 0px 4px 14px -3px rgba(0,0,0, 0.7);
	background-color: white;
`
const Container = styled.div`
	height: 100vh;
	display: grid;
	place-items: center;
	background-color: whitesmoke;
`
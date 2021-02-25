import React from 'react'
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { auth, provider } from '../FirebaseConfig';

export default function Login() {
    
    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider)
        .catch((error) => alert(error.message));
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" alt="" />
                <h1>Sign In</h1>
                <ButtonContainer>
                    <Button onClick={signIn}>
                        Sign In with Google
                    </Button>
                </ButtonContainer>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;

`;
const LoginInnerContainer = styled.div`

    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgb(0, 0, 0, 0.24);

    > img {
        height: 100px;
        object-fit: contain;
        margin-bottom: 40px;
    }
`;
const ButtonContainer = styled.div`
    margin-top: 20px;

    > button {
        background-color: #0a8d48!important;
        color: white;
    }
`;
import React, { useState } from 'react'
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { db } from '../FirebaseConfig';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../FirebaseConfig'

export default function ChatInput({ channelId, roomName, chatRef }) {

    const [input, setInput] = useState('');
    const [user] = useAuthState(auth);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!channelId) {
            return false;
        }
        db.collection('rooms').doc(channelId).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user?.displayName,
            userImage: user?.photoURL
        });
        chatRef.current.scrollIntoView({behavior: 'smooth', block: "center"});
        setInput('');
    }

    return (
        <ChatInputContainer>
            <form onSubmit={sendMessage}>
                <input value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message to #${roomName}`}
                />
                <Button hidden onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;

        > input {
            position: fixed;
            bottom: 30px;
            width: 60%;
            border: 1px solid gray;
            border-radius: 3px;
            padding: 20px;
            outline: none;
        }

        > button {
            display: none!important;
        }
    }
`;
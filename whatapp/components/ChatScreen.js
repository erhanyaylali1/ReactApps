import React, { useState, useRef, useEffect } from 'react'
import { auth, db } from '../firebaseConfig'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import MicIcon from '@material-ui/icons/Mic'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message';

const ChatScreen = ({ messages, recieverMail, chat }) => {
	
	const endRef = useRef(null)
	const [msg, setMsg] = useState('')
	const user = auth.currentUser
	const [messagesSnapShot] = useCollection(
		db.collection('chats')
		.doc(chat.id)
		.collection('messages')
		.orderBy('timestamp', 'asc')
	)
	const [recieverSnapShot] = useCollection(
		db.collection('users')
		.where('email', '==', recieverMail)
	)
	const reciever = recieverSnapShot?.docs[0]?.data()

	useEffect(() => {
		ScrollToBottom()
	})

	const showMessages = () => {
		if(messagesSnapShot){		
			return messagesSnapShot.docs.map((message) => {
				return (
					<Message
						key={message.id}
						data={message.data().timestamp}
						message={message.data().content}
						user={message.data().user}
					/>
				)
			})
		} else {
			return JSON.parse(messages).map((message) => {
				return (
					<Message
						key={message.id}
						data={messages.data}
						message={message.content}
						user={message.user}
					/>
				)
			})
		}
	}

	const sendMessage = (e) => {
		e.preventDefault()
		db.collection('users').doc(user.uid).set({
			lastSeen: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'}),
		}, { merge: true })
		db.collection('chats').doc(chat.id).update({ lastMessage: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'})})
		db.collection('chats').doc(chat.id).collection('messages').add({
			timestamp: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'}),
			content: msg,
			user: user.email,
			photoUrl: user.photoURL
		})
		setMsg('')
		ScrollToBottom()
	}

	const ScrollToBottom = () => {
		endRef.current.scrollIntoView({
			behavior: "smooth",
			block: "start"
		})
	}


	return (
		<Container>
			<Header>
				<Avatar />
				<HeaderInformation>
					<h4>{recieverMail}</h4>
					<p>Last Seen {reciever?.lastSeen}</p>
				</HeaderInformation>
				<HeaderIcons>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</HeaderIcons>
			</Header>
			<MessageContainer>
				{showMessages()}
				<End ref={endRef} />
			</MessageContainer>
			<InputContainer>
				<InsertEmoticonIcon />
				<Input 
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
				/>
				<button hidden disabled={!msg} type="submit" onClick={sendMessage}>
					SEND
				</button>
				<MicIcon />
			</InputContainer>
		</Container>
	)
}

export default ChatScreen

const Input = styled.input`
	flex: 1;
	align-items: center;
	padding: 10px 20px;
	position: sticky;
	background-color: whitesmoke;
	border: none;
	border-radius: 15px;
	margin: 0 10px;
	outline: none;
`
const InputContainer = styled.form`
	display: flex;
	align-items: center;
	padding: 15px;
	position: sticky;
	bottom: 0;
	z-index: 333;
	background-color: white;
`
const MessageContainer = styled.div`
	flex: 1;
	padding: 30px;
	max-height: 85vh;
	overflow-y: scroll;
	background-color: #e5ded8;
	::-webkit-scrollbar{
		display: none;
	}
`
const End = styled.div`
	height: 50px;
`
const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`
const Header = styled.div`
	display: flex;
	position: sticky;
	z-index: 55;
	background-color: white;
	top: 0;
	padding: 10px 20px;
	align-items: center;
	border-bottom: 2px solid whitesmoke;
`
const HeaderInformation = styled.div`
	margin-left: 20px;
	flex: 1;
	> h4 {
		font-weight: 500 !important;
		margin-bottom: 3px;
		margin-top: 3px;
	}
	> p {
		margin: 0px;
		color: #333;
		font-size: 13px;
	}
`
const HeaderIcons = styled.div``
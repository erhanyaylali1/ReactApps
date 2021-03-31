import React from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar'
import Head from 'next/head'
import { db, auth } from '../../firebaseConfig'
import ChatScreen from '../../components/ChatScreen';

const Chat = ({ messages, chat }) => {
	const user = auth.currentUser
	const recieverMail = chat ? chat.users.filter(item => item !== user.email)[0]:''
	
	return (
		<Container>
			<Head>
				<title>{recieverMail}</title>
			</Head>
			<Left>
				<Sidebar />
			</Left>
			<Right>
				<ChatScreen 
					messages={messages}
					chat={chat}
					recieverMail={recieverMail}
				/>
			</Right>
		</Container>
	)
}

export default Chat

export async function getServerSideProps(context) {
	const msgRef = db.collection('chats').doc(context.query.id)
	const messages = []
	await msgRef
	.collection('messages')
	.orderBy('timestamp','asc')
	.get()
	.then((docs) => {
		if(docs.size){
			docs.forEach((doc) => messages.push({ 
				...doc.data(), 
				id: doc.id 
			}))
		}
	})

	let chat
	await msgRef
	.get()
	.then((item) => {
		chat = { ...item.data(), id: item.id}
	})
	return {
		props: {
			messages: JSON.stringify(messages),
			chat
		}
	}	 
}

const Container = styled.div`
	display: flex;
`;
const Left = styled.div`
	flex: 25;
	height: 100vh;
	border-right: 1px solid whitesmoke;
`;
const Right = styled.div`
	flex: 75;
`;
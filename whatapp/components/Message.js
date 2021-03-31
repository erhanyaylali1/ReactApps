import React from 'react'
import styled from 'styled-components'
import { auth } from '../firebaseConfig'

const Message = ({ user, message, data }) => {
	const userLogged = auth.currentUser.email
	const Type = userLogged === user ? Sender : Reciever
	return (
		<Container>
			<Type>
				{message}
				<Time>{data?.substr(data.length-8)}</Time>
			</Type>
		</Container>
	)
}

export default Message

const Container = styled.div`
`
const MessageElement = styled.div`
	width: fit-content;
	padding: 10px 20px;
	border-radius: 8px;
	margin: 10px;
	min-width: 60px;
	position: relative;
	text-align: right;
	display: flex;
	flex-direction: column;
	::
`
const Time = styled.span`
	margin-top: 5px;
	font-size: 10px;
`

const Sender = styled(MessageElement)`
	margin-left: auto;
	background-color: #dcf8c6;
`

const Reciever = styled(MessageElement)`
	text-align: left;
	background-color: whitesmoke;
`
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Avatar } from '@material-ui/core';
import { auth, db } from '../firebaseConfig'
import { useRouter } from 'next/router'

const ChatHeader = ({ id, data }) => {
	const router = useRouter()
	const user = auth.currentUser
	const recieverMail = data ? data.users.filter(item => item !== user.email)[0]:''
	const [reciever, setReciever] = useState({})
	const isSelected = id === router.query?.id ? true:false

	useEffect(() => {
		db.collection('users').where('email', '==', recieverMail).get()
		.then((users) => {
			if(users.size === 1) {
				setReciever(users.docs[0].data())
			}
		})
	},[user])

	return (
		<Container 
			onClick={() => router.push(`/chat/${id}`)}
			style={{ backgroundColor: isSelected ? '#eee':'transparent'}}
		>
			<Image src={reciever?.photoUrl} />
			<Name>
				{ recieverMail }
			</Name>
		</Container>
	)
}

export default ChatHeader


const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 10px 10%;
	cursor: pointer;
	:hover {
		background-color: #eee !important;
	}
`;
const Name = styled.p`
	margin-left: 20px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const Image = styled(Avatar)``;
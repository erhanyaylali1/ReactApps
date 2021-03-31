import React from 'react'
import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebaseConfig'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatHeader from './ChatHeader';

const Sidebar = () => {

	const [user] = useAuthState(auth)
	const userChatRef = db
		.collection('chats')
		.orderBy('lastMessage','desc')
		.where('users', 'array-contains', user.email)


	const [chatSnapshot] = useCollection(userChatRef)

	const CreateChat = () => {
		const senderEmail = user.email
		const recieverEmail = prompt('Enter User Email Address')
		if(!recieverEmail) return
		if(EmailValidator.validate(recieverEmail) && IsChatAlreadyExists(recieverEmail) && (senderEmail !== recieverEmail)){
			db.collection('chats').add({
				users: [auth.currentUser.email, recieverEmail],
				lastMessage: new Date().toLocaleString('tr-TR', {timeZone:'Europe/Istanbul'})
			})
		}
	}

	const IsChatAlreadyExists = (recieverEmail) => {
		return !chatSnapshot?.docs.find(chat => chat.data().users.find(user => user === recieverEmail)?.length > 0)
	}

	const SignOut = () => {
		const check = confirm('Do You want to Sign In?')
		if(check) auth.signOut()
	}

	return (
		<Root>
			<Top>
				<Header>
					<UserAvatar src={user.photoURL} onClick={SignOut} />
					<IconContainer>		
						<IconButton>
							<MoreVertIcon />
						</IconButton>
						<IconButton>
							<ChatIcon />
						</IconButton>
					</IconContainer>
				</Header>
				<Search>
					<SearchIcon />
					<SearchInput placeholder="Search In Chats" />
				</Search>
				<SidebarButton  variant="text" fullWidth onClick={CreateChat}> 	
					START A NEW CHAT
				</SidebarButton>
			</Top>
			<Chats>
				{chatSnapshot?.docs.map((chat) => (
					<ChatHeader 
						key={chat.id } 
						id={chat.id} 
						data={chat.data()} 
					/>
				))
			}
			</Chats>
		</Root>
	)
}

export default Sidebar

const Top = styled.div`
	position: sticky;
	top: 0;
	z-index: 5;
	background-color: white;
`
const Chats = styled.div`
	flex: 1;
	overflow-y: scroll;
	::-webkit-scrollbar{
		display: none;
	}
`
const SidebarButton = styled(Button)``
const SearchInput = styled.input`
	outline-width: 0;
	border: none;
	flex: 1;
	margin-left: 10px;
`
const Search = styled.div`
	display: flex;
	align-items: center;
	padding: 15px;
	border-radius: 3px;
`;
const Header = styled.div`
	padding: 10px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: white;
	border-bottom: 2px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
	cursor: pointer;
	:hover {
		opacity: 0.8;
	}
`
const IconContainer = styled.div`
`
const Root = styled.div``;
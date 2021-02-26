import React from 'react';
import styled from 'styled-components'; 
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppsIcon from '@material-ui/icons/Apps';
import { IconButton, Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, logOut } from '../features/userSlice';
import { auth } from '../FirebaseConfig';

const Header = () => {
	
	const user = useSelector(getUser);
	const dispatch = useDispatch();

	const signOut = () => {
		const answer = window.confirm("Do You Want To Sign Out?");
		if(answer){
			auth.signOut();
			dispatch(logOut());
		}
	}
	
	return (
		<HeaderContainer>
			<HeaderLeft>
				<IconButton>
					<MenuIcon />
				</IconButton>
				<img src="https://logodownload.org/wp-content/uploads/2018/03/gmail-logo-1-1.png" alt="brand-logo"/>
			</HeaderLeft>
			<HeaderMid>
				<SearchIcon />
				<input placeholder="Search Mail" type="text" />
				<ArrowDropDownIcon />

			</HeaderMid>
			<HeaderRight>
				<IconButton>
					<AppsIcon />
				</IconButton>
				<IconButton>
					<NotificationsIcon />
				</IconButton>
				<Avatar onClick={signOut} src={user?.photo} />
			</HeaderRight>
		</HeaderContainer>
	)
}

export default Header

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 2px solid whitesmoke;
	padding-left: 5px;
`;

const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
	> img {
		height: 2rem;
		margin-left: 10px;
		object-fit: contain;
	}
`;

const HeaderMid= styled.div`
	display: flex;
	align-items: center;
	flex: 0.7;
	background-color: whitesmoke;
	padding: 10px;
	border-radius: 5px;
	> input {
		width: 100%;
		border: none;
		background-color: transparent;
		outline: none;
		font-size: medium;
	}
	> .MuiSvgIcon-root{
		color: grey;
		margin-left: 8px;
		margin-right: 10px;
	}
`;

const HeaderRight = styled.div`
	padding-right: 10px;
	display: flex;
	align-items: center;
	> .MuiAvatar-root {
		margin: 0 10px!important;
		width: 35px!important;
		height: 35px!important;
		cursor: pointer;
	}
`;
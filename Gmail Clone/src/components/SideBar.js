import React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import InboxIcon from '@material-ui/icons/Inbox';
import StarIcon from '@material-ui/icons/Star';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import NearMeIcon from '@material-ui/icons/NearMe';
import NoteIcon from '@material-ui/icons/Note';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SideBarElement from './SideBarElement';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import DuoIcon from '@material-ui/icons/Duo';
import { Button, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { openBox } from '../features/mailSlice';

const SideBar = () => {

	const dispatch = useDispatch();
	return (
		<SideBarContainer>
			<SideBarOption>
				<Button 
					startIcon={<AddIcon fontSize="large" />}
					onClick={()=>dispatch(openBox())}
				>
					New Mail
				</Button>
			</SideBarOption>
			<br />
			<SideBarElement Icon={InboxIcon} title="Inbox" number={54} selected={true} />
			<SideBarElement Icon={StarIcon} title="Starred" number={34} />
			<SideBarElement Icon={AccessTimeIcon} title="Snoozed" number={54} />
			<SideBarElement Icon={LabelImportantIcon} title="Important" number={54} />
			<SideBarElement Icon={NearMeIcon} title="Sent" number={54} />
			<SideBarElement Icon={NoteIcon} title="Drafts" number={54} />
			<SideBarElement Icon={ExpandMoreIcon} title="More" />

			<SideBarFooter>
				<SideBarFooterIcons>
					<IconButton>
						<PersonIcon />
					</IconButton>
					<IconButton>
						<DuoIcon />
					</IconButton>
					<IconButton>
						<PhoneIcon />
					</IconButton>
				</SideBarFooterIcons>
			</SideBarFooter>
		</SideBarContainer>
	)
}

export default SideBar


const SideBarContainer = styled.div`
	display: flex;
	flex: 0.2;
	flex-direction: column;
	height: 100vh;
	border-right: 2px solid whitesmoke;
`

const SideBarOption = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	> button {
		flex: 0.8;
		justify-content: center;
		color: gray;
		border-radius: 30px!important;
		padding: 10px;
		margin: 15px 10px 15px 10px!important;
		box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.75);
		:focus {
			outline: none!important;
		}
	}
`;


const SideBarFooter = styled.div`
`;

const SideBarFooterIcons = styled.div`
	display: flex;
	justify-content: center;
`;
import styled from 'styled-components';
import React from 'react'
import { Checkbox, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RedoIcon from '@material-ui/icons/Redo';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardHideIcon from '@material-ui/icons/KeyboardHide';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './SideBarElement.css';

const MailListIcons = () => {
	return (
		<MailListIconsContainer>
			<MailListSettingsLeft>
					<Checkbox />
					<IconButton>
						<ArrowDropDownIcon />
					</IconButton>
					<IconButton>
						<RedoIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</MailListSettingsLeft>
				<MailListSettingsRight>
					<IconButton>
						<ChevronLeftIcon />
					</IconButton>
					<IconButton>
						<ChevronRightIcon />
					</IconButton>
					<IconButton>
						<KeyboardHideIcon />
					</IconButton>
					<IconButton>
						<SettingsIcon />
					</IconButton>
				</MailListSettingsRight>
		</MailListIconsContainer>
	)
}

export default MailListIcons;

const MailListIconsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 2px solid whitesmoke;
	padding: 5px 20px;
`
const MailListSettingsLeft = styled.div``;
const MailListSettingsRight = styled.div``;
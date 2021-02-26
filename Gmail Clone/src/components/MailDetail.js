import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import PrintIcon from '@material-ui/icons/Print';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSelectedMail } from '../features/mailSlice';

const MailDetail = () => {

	const selected = useSelector(getSelectedMail);
	console.log(selected);

	return (
		<MailContainer>
			<MailTools>
				<MailToolsLeft>
					<Link to="/">
						<IconButton>
							<ArrowBackIcon />
						</IconButton>
					</Link>
					<IconButton>
						<MoveToInboxIcon />
					</IconButton>
					<IconButton>
						<ErrorIcon />
					</IconButton>
					<IconButton>
						<DeleteIcon />
					</IconButton>
					<IconButton>
						<EmailIcon />
					</IconButton>
					<IconButton>
						<WatchLaterIcon />
					</IconButton>
					<IconButton>
						<CheckCircleIcon />
					</IconButton>
					<IconButton>
						<LabelImportantIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</MailToolsLeft>
				<MailToolsRight>
					<IconButton>
						<UnfoldMoreIcon />
					</IconButton>
					<IconButton>
						<PrintIcon />
					</IconButton>
					<IconButton>
						<ExitToAppIcon />
					</IconButton>
				</MailToolsRight>
			</MailTools>
			<MailBody>
				<MailHeader>
					<h2> {selected?.subject} </h2>
					<LabelImportantIcon></LabelImportantIcon>
					<p>{selected?.title}</p>
					<p className="mail-time">{selected?.time}</p>
				</MailHeader>
				<MailMessage>
					<p>{selected?.description}</p>
				</MailMessage>
			</MailBody>
		</MailContainer>
	)
}

export default MailDetail;

const MailContainer = styled.div`
	display: flex;
	flex: 0.8;
	flex-direction: column;
`;
const MailTools = styled.div`
	padding: 0 10px;
	border-bottom: 3px solid whitesmoke;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
const MailToolsLeft = styled.div``;
const MailToolsRight = styled.div``;
const MailHeader = styled.div`
	display: flex;
	font-weight: 400;
	margin-right: 20px;
	align-items: center;
	position: relative;
	margin-bottom: 30px;

	> svg {
		color: #e8ab02;
		margin-right: 20px;
		margin-top: 3px;
	}
	> h2, p {
		margin: 0;
		margin-right: 20px;
	}
	> .mail-time{
		position: absolute;
		top: 10px;
		right: 0;
		font-size: 12px;
		color: gray;
	}
`;
const MailBody = styled.div`
	display: flex;
	flex-direction: column;
	margin: 30px;
	background-color: white;
	padding: 20px;
	height: 100vh;
`;
const MailMessage = styled.div`
	> p {
		padding: 10px;
		margin-right: 20px;
		overflow-wrap: break-word;
	}
`;
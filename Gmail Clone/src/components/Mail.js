import React from 'react';
import styled from 'styled-components';
import { Checkbox, IconButton } from '@material-ui/core';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectMail } from '../features/mailSlice';

const Mail = ({id, title, subject, description, time}) => {

	const history = useHistory();
	const dispatch = useDispatch();
	const openMail = () => {
		dispatch( selectMail({ id, title, subject, description, time }))
		history.push('/mail');
	}

	return (
		<MailContainer onClick={openMail}>
			<MailOptions>
				<Checkbox />
				<IconButton>
					<StarBorderOutlinedIcon />
				</IconButton>
				<IconButton>
					<LabelImportantOutlinedIcon />
				</IconButton>
			</MailOptions>
			<MailTitle>
				<h2>{title}</h2>
			</MailTitle>
			<MailMessage>
				<h4>{subject}</h4>
			</MailMessage>
			<MailDescription>
				<p>{description}</p>
			</MailDescription>
			<MailTime>
				<p>{time}</p>
			</MailTime>
		</MailContainer>
	)
}

export default Mail

const MailContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 50px;
	:hover {
		border-top: 1px solid whitesmoke;
		box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.24);
	}
	> p, h3, h4 {
		margin: 0;
	}
	> div {
		height: 100%;
		display: flex;
		white-space: nowrap;
		align-items: center;
		justify-content: flex-start;
		cursor: pointer;
	}
`;
const MailOptions = styled.div`
	padding-left: 20px;
	flex: 0.2;
`;
const MailTitle = styled.div`
	flex: 0.2;
	font-size: 9px;
	font-weight: bold;
`;
const MailMessage = styled.div`
	flex: 0.3;
	width: max-content;
	> h4 {
		text-overflow: ellipsis;
		overflow: hidden;
		width: 400px;
	};
`;
const MailDescription = styled.div`
	font-weight: 400;
	color: gray;
	flex: 0.2;
`;
const MailTime = styled.div`
	padding-right: 15px;
	font-size: 12px;
	font-weight: bold;
`;
import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeBox } from '../features/mailSlice';
import { db } from '../FirebaseConfig';
import firebase from 'firebase';

const NewMail = () => {

	const dispatch = useDispatch();
	const { register, handleSubmit, errors } = useForm();
	const onSubmit = (data) => {
		db.collection('emails').add({
			to: data.to,
			subject: data.subject,
			message: data.message,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		});
		dispatch(closeBox())
	}

	return (
		<NewMailContainer>
			<NewMailHeader>
				<h3>New Message</h3>
				<CloseIcon onClick={() => dispatch(closeBox())} />
			</NewMailHeader>
			<form  onSubmit={handleSubmit(onSubmit)}>
				<input 
					name="to" 
					placeholder="to" 
					ref={register({ required: true })}
					type="text"
				/> 
				{errors.to && <p className="errors">To is Required</p>}
				<input 
					name="subject" 
					placeholder="subject" 
					ref={register({ required: true })}
					type="text"
				/>	
				{errors.subject && <p className="errors">Subject is Required</p>}
				<input 
					name="message" 
					id="message" 
					ref={register({ required: true })}
					type="text"
				/>
				{errors.message && <p className="errors">Message is Required</p>}
				<div className="sendButton">
					<Button type="sumbit">Send</Button>
				</div>
			</form>
		</NewMailContainer>
	)
}

export default NewMail

const NewMailContainer = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	bottom: 0;
	right: 50px;
	height: 400px;
	width: 40%;
	z-index: 999;
	max-width: 500px;
	background-color: #404040;
	border: 1px solid whitesmoke;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	> form {
		display: flex;
		flex-direction: column;
		flex: 1;

		> input {
			height: 35px;
			padding: 20px;
			width: 100%;
			border: none;
			border-bottom: 2px solid whitesmoke;
			outline: none;
			word-wrap: break-word;
    		word-break: break-word;
			overflow: hidden;
		}
		> #message{
			flex: 1;
		}
		> div > Button {
			background-color: #3079ed!important;
			text-transform: capitalize!important;
			margin: 15px!important;
		}
		> .errors {
			background-color: white;
			color: red;
			text-align: right;
			margin: 0;
			padding: 2px;
		}
	}
`;
const NewMailHeader = styled.div`
	padding: 15px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: whitesmoke;
	> h3 {
		margin: 0;
	}
	> .MuiSvgIcon-root {
		cursor: pointer;
	}
`;
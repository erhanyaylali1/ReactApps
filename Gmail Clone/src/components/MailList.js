import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MailListIcon from './MailListIcons';
import Section from './Section';
import InboxIcon from '@material-ui/icons/Inbox';
import PeopleIcon from '@material-ui/icons/People';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Mail from './Mail';
import { db } from '../FirebaseConfig';

const MailList = () => {

	const [mails, setMails] = useState([]);

	useEffect(()=>{
		
		db.collection('emails')
		.orderBy('timestamp','desc')
		.onSnapshot((snapshot) => 
			setMails(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data()
				}))
			)
		);
	},[])

	return (
		<MailListContainer>
			<MailListSettings>
				<MailListIcon />
			</MailListSettings>
			<MailListSection>
				<Section Icon={InboxIcon} title='Primary' color='red' selected />
				<Section Icon={PeopleIcon} title='Social' color='blue' />
				<Section Icon={LocalOfferIcon} title='Promotions' color='green' />
			</MailListSection>
			<MailRows>
				{mails && mails.map(({id, data}) => (
					<Mail 
						key={id}
						id={id}
						title={data.to}
						subject={data.subject}
						description={data.message}
						time={new Date(data.timestamp?.seconds * 1000).toUTCString()}
					/>
				))}
			</MailRows>
		</MailListContainer>
	)
}

export default MailList;

const MailListContainer = styled.div`
	flex: 0.8;
	padding: 0;
`;
const MailListSection = styled.div`
	overflow-y: scroll;
	display: flex;
	justify-content: start;
`
const MailListSettings = styled.div`
	position: sticky;
	top: 0;
	z-index: 999;
`;

const MailRows = styled.div``;
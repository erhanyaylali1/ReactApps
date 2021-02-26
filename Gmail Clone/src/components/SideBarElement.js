import React from 'react';
import styled from 'styled-components';
import './SideBarElement.css';

export const SideBarElement = ({ Icon, title, number, selected }) => {

	
	return (
		<SideBarElementContainer className={selected && 'SideBarElement--active'}>
			<Icon />
			<h3>{ title }</h3>
			<p>{ number }</p>
		</SideBarElementContainer>
	);
}

export default SideBarElement;

const SideBarElementContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	cursor: pointer;
	color: #818181;
	padding: 15px 20px;
	> h3 {
		margin: 0;
		margin-left: 15px;
		font-weight: 500;
	}
	> p {
		display: none;
		font-weight: 300;
		margin: auto;
        margin-right: 0;
	}
	:hover {
		background-color: #fcecec;
		> p {
			display: inline-block;
			color: #c04b37;
		}

		> h3 {
			color: #c04b37;
		}

		> svg {
			color: #c04b37;
		}
	}
`;
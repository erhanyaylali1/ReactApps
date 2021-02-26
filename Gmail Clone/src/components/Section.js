import React from 'react';
import styled from 'styled-components';

const Section = ({ Icon, title, color, selected }) => {
	return (
		<SectionContainer 
			className={selected && 'section--selected'}
			style={{
				borderBottom: `0px solid ${color}`,
				color: `${selected && color}`
			}}		
		 >
			<Icon />
			<h4>{title}</h4>
		</SectionContainer>
	)
}

export default Section

const SectionContainer = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	flex: 0.33333;
	max-width: 300px;
	padding: 15px;
	padding-left: 25px;
	background-color: white;
	cursor: pointer;
	> h4 {
		margin: 0 0 0 10px;
	}
	:hover {
		background-color: rgba(0,0,0,0.1);
		border-bottom-width: 3px!important;
	}
`;
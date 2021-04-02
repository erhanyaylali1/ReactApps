import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

const NavbarItem = ({ active, title, callBack }) => {

	return active ? (
		<ActiveItem item xs={12} onClick={() => callBack(title)}>
            <a href={`#${title}`}>
			    <p style={{ color: 'white' }}>{ title }</p>
            </a>
		</ActiveItem>
	):(
		<NotActiveItem item xs={12} onClick={() => callBack(title)}>
			<a href={`#${title}`}>
			    <p style={{ color: '#ddd' }}>{ title }</p>
            </a>
		</NotActiveItem>
	)
}

export default NavbarItem

const ActiveItem = styled(Grid)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 500;
	font-size: 16px;
	color: white;
	font-size: 18px;
`
const NotActiveItem = styled(Grid)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 500;
	font-size: 16px;
	padding: 1rem;
	font-size: 16px;
	:hover{
		transform: scale(1.1) !important;
	}
`
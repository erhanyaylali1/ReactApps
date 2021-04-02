import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

const NavbarItem = ({ active, title, callBack }) => {

	return active ? (
		<ActiveItem item xs={12} onClick={() => callBack(title)}>
			<p>{ title }</p>
		</ActiveItem>
	):(
		<NotActiveItem item xs={12} onClick={() => callBack(title)}>
			<p>{ title }</p>
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
	padding: 1rem;
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
	color: #ddd;
	font-size: 16px;
	:hover{
		transform: scale(1.1) !important;
	}
`
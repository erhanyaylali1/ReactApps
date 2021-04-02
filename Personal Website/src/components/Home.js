import React from 'react'
import Banner from '../assets/Home.png'
import Banner2 from '../assets/Home2.png'
import styled from 'styled-components'
import { Grid } from '@material-ui/core';

const Home = () => {
	const width = window.innerWidth
	return (
		<Container item xs={12} id="Home">
			<ImageBanner
				src={width < 450 ? Banner2:Banner}
				alt="Home Banner"
			/>
		</Container>
	)
}

export default Home

const Container = styled(Grid)`
	height: min-content;
	position: relative;
`
const ImageBanner = styled.img`
	width: 100%;
	z-index: -2;
`
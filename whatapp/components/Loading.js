import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
	return (
		<Container>
			<CircularProgress />
		</Container>
	)
}

export default Loading

const Container = styled.div`
	display: grid;
	place-items: center;
	width: 100%;
	height: 100vh;
`
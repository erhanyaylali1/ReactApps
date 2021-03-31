import Head from 'next/head'
import Sidebar from '../components/Sidebar';
import styled from 'styled-components'

const Home = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container>
				<Left>
					<Sidebar />
				</Left>
				<Right>

				</Right>
			</Container>
		
		</div>
	)
}

export default Home

const Container = styled.div`
	display: flex;
`;
const Left = styled.div`
	flex: 25;
	height: 100vh;
	border-right: 2px solid whitesmoke;
`;
const Right = styled.div`
	flex: 75;
`;
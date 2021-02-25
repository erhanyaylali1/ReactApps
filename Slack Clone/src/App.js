import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './FirebaseConfig'
import Header from './components/Header';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import Spinner from 'react-spinkit';

function App() {

	const [ user, loading ] = useAuthState(auth);
	
	if(loading) {
		return(
			<AppLoading>
				<AppLoadingContents>
					<img src="https://www.flaticon.com/svg/vstatic/svg/2111/2111615.svg?token=exp=1614230728~hmac=e8fffe2556939e935dcba3f2f17295bc" alt="" />
					<Spinner 
						name="ball-spin-fade-loader"
						color="purple"
						fadeIn="none"
					/>
				</AppLoadingContents>
			</AppLoading>
		)
	}

	return (
		<div className="App">
			<Router>
				{!user ? <Login />:(
					<AppContainer>
						<Header />
						<AppBody>
							<Sidebar />
							<Switch>
								<Route path="/" exact>
									<Chat />
								</Route>
							</Switch>
						</AppBody>
						<AppFooter>
							<p>© ERHAN YAYLALI 2021</p>
						</AppFooter>
					</AppContainer>
				)}
			</Router>
		</div>
	);
}

export default App;

const AppContainer = styled.div`
	height: 100vh;
`;
const AppBody = styled.div`
	display: flex;
	height: 90vh;
`;

const AppLoading = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
	width: 100%;
`;
const AppLoadingContents = styled.div`
	text-align: center;
	padding-bottom: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> img {
		height: 100px;
		padding: 20px;
		margin-bottom: 50px;
	}
`;

const AppFooter = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 20%;
	max-width: 260px;
	background-color: var(--slack-color);
	height: 5vh;
	z-index: 0;
	display: flex;
	justify-content: center;
	align-items: center;

	> p {
		margin: 0;
		color: white;
		font-size: 13px;
	}
`;
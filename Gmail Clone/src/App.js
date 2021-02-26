import React, { useEffect } from 'react';
import Header from './components/Header';
import styled from 'styled-components';
import SideBar from './components/SideBar';
import MailList from './components/MailList';
import MailDetail from './components/MailDetail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NewMail from './components/NewMail';
import { useSelector, useDispatch } from 'react-redux';
import { selectVisibility } from './features/mailSlice';
import { getUser, logIn } from './features/userSlice';
import Login from './components/Login';
import { auth } from './FirebaseConfig';

const App = () => {

	const user = useSelector(getUser);
	const visibility = useSelector(selectVisibility);
	const dispatch = useDispatch();
	
	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if(user) {
				dispatch(logIn({
					displayName: user.displayName,
					email: user.email,
					photo: user.photoURL
				}))
			}
		})
	}, [dispatch])
  
	return (  
		<Router>
			{!user ? 
				<Login /> : 
				(
				<AppContainer>
					<Header />
					<AppBody>
						<SideBar/>
						<Switch>
							<Route path="/" exact>
								<MailList />
							</Route>
							<Route path='/mail'>
								<MailDetail />
							</Route>
						</Switch>
					</AppBody>
					{visibility && <NewMail />}				
				</AppContainer>)
			}
		</Router>
	);
}

export default App;

const AppContainer = styled.div`
	padding: 0;
`
const AppBody = styled.div`
	display: flex;
	flex-direction: row;
`;
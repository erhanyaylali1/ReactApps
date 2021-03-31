import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Index from './components/Index'
import SignIn from './components/SignIn'
import Contact from './components/Contact'
import 'antd/dist/antd.css'


const App = () => {
    return (
        <Router>
			<Switch>
				<Route exact path='/'>
					<Index />
				</Route>
				<Route path='/sign'>
					<SignIn />
				</Route>
				<Route path='/contact'>
					<Contact />
				</Route>
			</Switch>
        </Router>
    );
}

export default App;
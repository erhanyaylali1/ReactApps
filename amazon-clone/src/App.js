import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Home from './components/Home';
import SignIn from './components/SignIn';
import { auth } from './FirebaseConfig';
import { logIn, logOut } from './features/userSlice';

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                dispatch(logIn({
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber,
                    photo: user.photoURL,
                }));
            } else {
                dispatch(logOut());
            }
        })
    },[dispatch])

    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />                    
                    <Route path="/login" component={SignIn} />
                    <Route path="/checkout"component={Checkout} />
                </Switch>
            </div>
        </Router>
        
    );
}

export default App;
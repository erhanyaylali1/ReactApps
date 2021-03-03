import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Home from './components/Home';
import Payment from './components/Payment';
import SignIn from './components/SignIn';
import Orders from './components/Orders';
import { auth, db } from './FirebaseConfig';
import { logIn, logOut } from './features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SignUp from './components/SignUp';


const key = "pk_test_51IQHEZIgvsyIQmisQpIWaWpTlFwzNdsd5UPVGDmSMLCUcRg6pqnhqRYyfqzbwQnMSwH60z53vOiUNWvEgz83G8ac00yepirUSJ"
const promise = loadStripe(key);

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                db.collection('users').doc(user?.uid).get()
                .then((doc) => {            
                    if(doc.data()){
                        dispatch(logIn({
                            id: user?.uid,
                            name: doc.data()?.name,
                            username: doc.data().username,
                            email: doc.data().email,
                            password: doc.data().password,
                            address: doc.data().address,
                            phone: doc.data().number
                        }));   
                    }                                         
            })} else {
                dispatch(logOut());
            }
        })
    },[dispatch])

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home}>
                        <Header />
                        <Home />
                    </Route>                    
                    <Route path="/login">
                        <SignIn />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/checkout">
                        <Header />
                        <Checkout />
                    </Route>
                    <Route path="/payment">
                        <Header />
                        <Elements stripe={promise}>
                            <Payment />
                        </Elements>
                    </Route>
                    <Route path="/orders">
                        <Header />
                        <Orders />
                    </Route>
                    <Route path="/orders">
                        <Header />
                        <Orders />
                    </Route>
                    
                </Switch>
            </div>
        </Router>
        
    );
}

export default App;
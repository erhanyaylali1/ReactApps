import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';
import Footer from './components/Footer';
import Messages from './components/Messages';
import Notifications from './components/Notifications';

function App() {
    return (
      <Router>
         <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Index />
              </Route>
              <Route path="/login">
                  <Login />
              </Route>
              <Route path='/register'>
                  <Register />
              </Route>
              <Route path='/user'>
                  <User />
              </Route>
              <Route path='/messages'>
                  <Messages />
              </Route>
              <Route path='/notifications'>
                  <Notifications />
              </Route>
            </Switch>
            <Footer />
        </div>
      </Router>
    );
  }

export default App;
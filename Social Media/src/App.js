import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';
import Messages from './components/Messages';
import Notifications from './components/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged, getNotifications, getUser, setNotifications } from './features/userSlice';
import axios from 'axios';

function App() {

    const dispatch = useDispatch();
    const isLogged = useSelector(getIsLogged);
    const user = useSelector(getUser);
    const notifications = useSelector(getNotifications);

    useEffect(() => {
        let fetchNotification = setInterval(() => {
            if(isLogged) {
                axios({
                    method: 'get',
                    url: `https://us-central1-socialony.cloudfunctions.net/api/notifications/${user.userId}`
                })
                .then((respond) => {
                    if(respond.data) {
                        dispatch(setNotifications(respond.data));
                    }
                })
                .catch((err) => console.log(err));
            }
        },5000);
        
        return () => {
            clearInterval(fetchNotification);
        }
    })

 

    return (
      <Router>
         <div className="App">
            <Navbar />
            <Switch >
              <Route exact path="/">
                <Index />
              </Route>
              <Route path="/login">
                  <Login />
              </Route>
              <Route path='/register'>
                  <Register />
              </Route>
              <Route path='/user/:userId'>
                  <User />
              </Route>
              <Route path='/messages'>
                  <Messages />
              </Route>
              <Route path='/notifications'>
                  <Notifications />
              </Route>
            </Switch>
        </div>
      </Router>
    );
  }

export default App;
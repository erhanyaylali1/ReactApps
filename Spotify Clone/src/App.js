import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import Home from './components/Home';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { getToken, login, setToken, setPlaylists } from './features/userSlice';
import Sidebar from './components/Sidebar';
import { SpeakerPhone } from '@material-ui/icons';

const spotify = new SpotifyWebApi();

function App() {

    const dispatch = useDispatch();
    const token = useSelector(getToken)
    useEffect(() => { 
        const hash = getTokenFromUrl();
        window.location.hash = "";
        const _token = hash.access_token; 
        if(_token){
            dispatch(setToken(_token));
            spotify.setAccessToken(_token);
            spotify.getMe().then((user) => {
                dispatch(login(user));
            })
            spotify.getUserPlaylists().then((playlists) => {
                dispatch(setPlaylists(playlists.items))
            })
        }
    },[dispatch]);

    return (
        <div className="App">
            { token ? (
                <React.Fragment>
                    <Home spotify={spotify} />
                </React.Fragment>                
            ): (
                <Login />
            )}
        </div>
    );
}

export default App;
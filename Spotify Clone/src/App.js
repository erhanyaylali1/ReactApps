import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import { getTokenFromUrl } from './spotify';

function App() {

    const [token, setToken] = useState(null);

    useEffect(() => {
        const hash = getTokenFromUrl();
        window.location.hash = "";
        const _token = hash.access_token;
        if(_token) setToken(_token);
    },[token]);

    return (
        <div className="App">
            { token ? (
                <Home />
            ): (
                <Login />
            )}
        </div>
    );
}

export default App;
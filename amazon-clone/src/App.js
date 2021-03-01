import React from 'react'; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/checkout"component={Checkout} />
                </Switch>
            </div>
        </Router>
        
    );
}

export default App;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ForecastList from './components/ForecastList';
import City from './components/City';
import 'semantic-ui-css/semantic.min.css'

function App() {
    
    return (
        <BrowserRouter>
            <div className="App p-5">
                <div>
                    <Switch>
                        <Route path="/" exact>
                            <SearchBar />
                            <ForecastList />
                        </Route>
                        <Route path="/detail" exact>
                            <City />
                        </Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

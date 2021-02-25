import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {

    return (
        <div className="ui container pt-2">
            <Router history={history}>
                <Header />
                <div className="pt-5">
                    <Route path="/" exact component={StreamList} />
                    <Route path="/streams/new" exact component={StreamCreate} />
                    <Route path="/streams/show" exact component={StreamShow} />
                    <Route path="/streams/delete/:id" exact component={StreamDelete} />
                    <Route path="/streams/edit/:id" exact component={StreamEdit} />
                </div>
            </Router>
        </div>
    );
};

export default App;
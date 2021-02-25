import React from 'react';
import SearchBar from './SearchBar';
import Unsplash from '../api/Unsplash';
import ImageList from './ImageList';

class App extends React.Component {

    state = { images: [] };

    getInputfromSearch = async (term) => {
       const results = await Unsplash(term);
       this.setState({images: results});
    };

    render () {

        return (
            <div className="ui container" style={{ marginTop: '20px' }}>
                <SearchBar sendInputfromSearch={this.getInputfromSearch}/>
                <ImageList images={this.state.images}/>
            </div>
        );
    }
}

export default App
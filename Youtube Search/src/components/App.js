import React from 'react';
import SearchBar from './SearchBar';
import Youtube from '../api/Youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import Social from './Social';

class App extends React.Component {

    state = { videos: [], selectedVideo: null };

    componentDidMount() {
        this.getTermFromSearchBar("Buildings");
    }

    getTermFromSearchBar = async (term) => {
        
        const results = await Youtube(term);
        this.setState({ videos: results, selectedVideo: results[0] });
    };

    onVideoSelect = (video) => {

        this.setState({ selectedVideo: video });
    };

    render() {
        
        return (
            <div className="ui container mx-auto" style={{padding: '20px 0'}}>
                <SearchBar propFunc={this.getTermFromSearchBar} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column" style={{maxHeight: "600px", overflowY: "scroll"}}>
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
                <Social />
            </div>
        );
    };
};

export default App;
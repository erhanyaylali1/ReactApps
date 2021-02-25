import React from 'react';

const VideoDetail = (props) => {
    
    
    if (!props.video) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="ui embed">
                <iframe 
                    src={`https://www.youtube.com/embed/${props.video.id.videoId}`} 
                    title="props.video.snippet.title" 
                />
            </div>
            <div className="ui segment">
                <h4 className="ui header">{props.video.snippet.title}</h4>
                <p>{props.video.snippet.description}</p>
            </div>
            <div className="ui buttons right floated">
                <button className="ui button"><i class="thumbs up icon" style={{margin: "0"}}></i></button>
                <div className="or"></div>
                <button className="ui positive button"><i class="thumbs down icon" style={{margin: "0"}}></i></button>
            </div>
        </div>
    );
};

export default VideoDetail
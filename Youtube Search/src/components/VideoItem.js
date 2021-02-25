import React from 'react';
import './VideoItem.css';

const VideoItem = (props) => {

    return (
        <div className="item VideoItem" onClick={() => props.onVideoSelect(props.video)}>
            <img 
                className="ui image"
                src={props.video.snippet.thumbnails.high.url} 
                alt={props.video.snippet.title}
            />
            <div className="content">
                <div className="header">
                    {props.video.snippet.title}
                </div>
            </div>
        </div>
    );
};
export default VideoItem;
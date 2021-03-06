import { Favorite, MoreHoriz, PlayCircleFilled } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSpotify } from '../features/userSlice';
import Header from './Header';
import SongRow from './SongRow';
import './styles/Body.css';

const Body = () => {

    const spotify = useSelector(getSpotify);
    const discover = null;

    // useEffect(() => {
    //     spotify.
    // }, [])

    return (
        <div className="body">
            <Header spotify={spotify} />
            <div className="body__info">
                <img 
                    src={discover?.images && discover?.images[0]?.url}
                    alt="album logo"
                    className="album__logo"
                />
                <div className="body__infoText">
                    <strong>Playlist</strong>
                    <h2>Discover Daily Week</h2>
                    <p>Description...</p>
                </div>
            </div>
            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilled />
                    <Favorite />
                    <MoreHoriz />
                </div>
                {discover?.tracks?.items.map(item => {
                    return <SongRow track={item.track} />
                })}
            </div>
    </div>
    )
}

export default Body

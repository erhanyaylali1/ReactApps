import React from 'react';
import Header from './Header';
import './styles/Body.css';

const Body = ({ spotify }) => {
    
    return (
        <div className="body">
            <Header spotify={spotify} />
            <div className="body__info">
                <img 
                    src="https://images.ctfassets.net/tvhwpwv117no/6pR0M0vcgPBB8LzYs1oP3A/5dfdc789956339c8ffc526562b029574/Five_years_of_discovery_and_engagement_through_Discover_Weekly.jpg"
                    alt="album logo"
                    className="album__logo"
                />
                <div className="body__infoText">
                    <strong>Playlist</strong>
                    <h2>Discover Daily Week</h2>
                    <p>Description...</p>
                </div>
            </div>
        </div>
    )
}

export default Body

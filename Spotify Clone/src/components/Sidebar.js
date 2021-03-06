import React from 'react';
import SidebarOption from './SidebarOption';
import './styles/Sidebar.css';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { useSelector } from 'react-redux';
import { getPlaylists } from '../features/userSlice';

const Sidebar = ({spotify}) => {

    const playlists = useSelector(getPlaylists);
    return (
        <div className="sidebar">
            <img 
                className="sidebar__logo"
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
                alt="spotify logo"
            />
            <SidebarOption Icon={HomeIcon} title="Home" />
            <SidebarOption Icon={SearchIcon} title="Search" />
            <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
            <hr className="vertical__line"/>
            <div className="sidebar__title">
                <strong className="sidebar__title">PLAYLISTS</strong>
            </div>
            {playlists?.map((platlist, index) => {
                return <SidebarOption key={index} title={platlist.name} />
            })}
        </div>
    )
}

export default Sidebar

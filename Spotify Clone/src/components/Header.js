import { Avatar } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../features/userSlice';
import './styles/Header.css';

const Header = ({spotify}) => {

    const user = useSelector(getUserInfo);
    return (
        <div className="header">
            <div className="header__left">
                <SearchOutlined />
                <input 
                    placeholder="Search for Artists, Songs or Albums"
                    type="text"
                />
            </div>
            <div className="header__right">
                <Avatar 
                    src={user.images ? user.images[0]?.url:''}
                    alt="user avatar"
                />
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}

export default Header

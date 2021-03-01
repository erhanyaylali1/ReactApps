import React from 'react';
import './styles/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
                <img 
                    src='https://www.pinclipart.com/picdir/big/57-576184_view-our-amazon-storefront-amazon-logo-white-png.png' 
                    alt='brand-logo' 
                    className="header__logo"
                />
            </Link>
            
            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon 
                    className="header_searchIcon"
                />
            </div>
            <div className="header__nav">
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Welcome
                    </span>
                    <span className="header__optionLineTwo">
                        Sign In
                    </span>
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Returns
                    </span>
                    <span className="header__optionLineTwo">
                        & Orders
                    </span>
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Your
                    </span>
                    <span className="header__optionLineTwo">
                        Prime
                    </span>
                </div>
                <div className="header__optionBasket">
                    <Link to="/checkout">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">0</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header

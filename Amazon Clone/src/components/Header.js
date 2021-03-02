import React from 'react';
import './styles/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getItems } from '../features/cardSlice';
import { getIsLogged, } from '../features/userSlice';
import { auth } from '../FirebaseConfig';
import { withRouter } from 'react-router-dom';

const Header = (props) => {

    const itemCount = useSelector(getItems).length;
    const isLogged = useSelector(getIsLogged);

    const SignOut = () => {
        auth.signOut()
        .then(() => props.history.push('/login'))
        .catch((error) => alert(error.message))        
    }


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
                {isLogged ? (
                    <div className="header__option" onClick={SignOut}>
                        <span className="header__optionLineOne">
                            Welcome
                        </span>
                        <span className="header__optionLineTwo">
                            Sign Out
                        </span>
                    </div>
                ):(
                    <Link to="/login">
                        <div className="header__option">
                            <span className="header__optionLineOne">
                                Hello Guest
                            </span>
                            <span className="header__optionLineTwo">
                                Sign In
                            </span>
                        </div>
                    </Link>
                )}

                {isLogged ? (
                    <Link to="/orders">
                        <div className="header__option">
                            
                            <span className="header__optionLineOne">
                                Returns
                            </span>
                            <span className="header__optionLineTwo">
                                & Orders
                            </span>
                        </div>
                    </Link>
                ):(
                    <div className="header__option">
                        <span className="header__optionLineOne">
                            Returns
                        </span>
                        <span className="header__optionLineTwo">
                            & Orders
                        </span>
                    </div>
                )}
                
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
                        <span className="header_optionLineTwo header_basketCount">
                            {itemCount}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header)
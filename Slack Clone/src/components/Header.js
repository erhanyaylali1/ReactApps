import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../FirebaseConfig'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';



function Header() {

    const [user] = useAuthState(auth);
    const SignOut = () => {
        const respond = window.confirm("Do You Want to Sign Out ?")
        if (respond) {
            auth.signOut();
        }
    }
    return (
        <div>
            <HeaderContainer>
                <HeaderLeft>
                    <HeaderAvatar
                        onClick={SignOut}
                        alt={ user?.displayName } 
                        src={ user?.photoURL }
                    />
                    <AccessTimeIcon />
                </HeaderLeft>

                <HeaderSearch>
                    <SearchIcon />
                    <input placeholder='Search' type='text' />
                </HeaderSearch>

                <HeaderRight>
                    <HelpOutlineIcon />
                </HeaderRight>
            </HeaderContainer>
        </div>
    )  
}

export default Header


const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0;
    color: white;
    background-color: var(--slack-color);
    z-index: 999;
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    align-items: center;
    display: flex;
    margin-left: 20px;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    background-color: #421f44;
    text-align: center;
    display: flex;
    padding: 2px 10px;
    color: gray;
    border: 1px gray solid;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: none;
        color: white;
        width: 100%;
    }
`;

const HeaderRight = styled.div`
    display: flex;
    flex: 0.3;
    align-items: flex-end;    

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;
    }
`;
import React from 'react';
import styled from 'styled-components';
import CreateIcon from '@material-ui/icons/Create';
import { FiberManualRecord } from '@material-ui/icons';
import SidebarChannels from './SidebarChannels';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../FirebaseConfig'

function Sidebar() {

    const [user] = useAuthState(auth);
    return (

        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>{ user?.displayName }</h2>
                    <h3>
                        <FiberManualRecord />
                        { user?.displayName }
                    </h3>
                </SidebarInfo>
                <CreateIcon />
            </SidebarHeader>
            <SidebarChannels />
        </SidebarContainer>
    );
}

export default Sidebar


const SidebarContainer = styled.div`
    color: white;
    background-color: var(--slack-color);
    display: flex;
    flex-direction: column;
    flex: 0.25;
    border-top: 1px solid #49274b;
    max-width: 260px;

    > hr {
        margin: 10px 0;
        border: 1px solid #49274b;
    }
`;

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;
    margin-bottom: 10px;
    
    > .MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 15px;
        background-color: white;
        border-radius: 999px;
        cursor: pointer;
    }
`;

const SidebarInfo = styled.div`
    flex: 1;

    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        display: flex;
        margin-top: 10px;
        font-size: 13px;
        font-weight: 400;
        align-items: center;

        > .MuiSvgIcon-root {
            font-size: 15px;
            margin-right: 5px;
            color: green;
        }
    }
`;
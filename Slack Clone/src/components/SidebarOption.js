import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { db } from '../FirebaseConfig';
import { enterRoom } from '../features/appSlice';

function SidebarOption({ Icon, title, name, addChannelOption, id }) {
    
    const dispatch = useDispatch();

    const addChannel = () => { 
        const channelName = prompt('Please Enter the Channel Name');
        if(channelName) {
            db.collection('rooms').add({
                name: channelName,                
            });
        }
    };

    const selectChannel = () => {
        if(id) {
            dispatch(enterRoom({
                roomId: id,
                roomName: name
            }));
        }
    };
    
    return (
        <SidebarOptionContainer
            onClick={addChannelOption ? addChannel : selectChannel}
        >
            {Icon && <Icon fontSize='small' style={{ padding: '10px'}} />}
            {Icon ? (
                <h3>{ title }</h3>
            ):(
                <SidebarOptionChannel>
                    <span>#</span> { title }
                </SidebarOptionChannel>
            )}
        </SidebarOptionContainer>
    )
}

export default SidebarOption

const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background-color: #340e36;
    }

    > h3 {
        font-weight: 500;

        > span {
            padding: 15px;
        }
    }
`;
const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;

`;
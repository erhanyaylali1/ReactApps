import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutLinedIcon from '@material-ui/icons/InfoOutlined';
import { selectRoomId, selectRoomName } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../FirebaseConfig';
import Message from './Message';

function Chat() {

    const roomId = useSelector(selectRoomId);
    const roomName = useSelector(selectRoomName);

    const chatRef = useRef(null);

    const [roomDetail] = useCollection(
        roomId && db.collection('rooms').doc(roomId)
    );

    const [roomMessage, loading] = useCollection(
        roomId && 
        db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp','asc')
    ); 
    
    useEffect(()=>{
        if(chatRef.current) {
            chatRef?.current?.scrollIntoView();
        }
    }, [roomId, loading])

    return (
        <ChatContainer>
            {!roomDetail && (
                    <div></div>
            )}
            <ChatHeader>
                    <ChatHeaderLeft>
                        <h4><strong>{roomName}</strong></h4>
                        <StarBorderOutlinedIcon />
                    </ChatHeaderLeft>
                    <ChatHeaderRight>
                        <p> 
                            <InfoOutLinedIcon />
                            Details
                        </p>
                    </ChatHeaderRight>
                </ChatHeader>
                <ChatMessages id="chatMessageBox">
                    {roomMessage?.docs.map((doc) => {
                        const { message, timestamp, user, userImage } = doc.data();
                        return (
                            <Message 
                                key={doc.id}
                                message={message}
                                timestamp={timestamp}
                                user={user}
                                userImage={userImage}
                            />
                        )
                })}
                    <ChatBottom ref={chatRef} id="end" />
                </ChatMessages>
                <ChatInput chatRef={chatRef} channelId={roomId} roomName={roomName} />
        </ChatContainer>
    );
}

export default Chat;

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;    
`;

const ChatHeader = styled.div`
    position: sticky;
    top: 0;
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    border-bottom: 1px solid lightgray;
`;

const ChatHeaderLeft = styled.div`
    display: flex;
    align-items: center;

    > h4 {
        display: flex;
        margin-right: 5px;
    }

    > .MuiSvgIcon-root {
        font-size: 20px;
        cursor: pointer;

        :hover {
            color: grey;
        }
    }
`;

const ChatHeaderRight = styled.div`
    display: flex;
    align-items: center;

    > p {
        display: flex;
        align-items: center;
        font-size: 14px;

        > .MuiSvgIcon-root {
            margin-right: 5px!important;
            font-size: 18px;
        }
    }
`;

const ChatMessages = styled.div`
    overflow: auto;
`;
const ChatBottom = styled.div`
    padding-bottom: 200px;
`;
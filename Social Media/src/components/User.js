import React,{ useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getIsLogged, getUser } from '../features/userSlice';
import { getRefresh } from '../features/status';
import { message } from 'antd';


const User = (props) => {

    const dispatch = useDispatch();
    const classes = useStyle();
    const [user, setUser] = useState(null);
    const isLogged = useSelector(getIsLogged);
    const profileId = props.match.params.userId
    const loggedUser = useSelector(getUser);
    const refresh = useSelector(getRefresh);
    const isUserFollow = loggedUser?.follows?.includes(profileId) ? true:false;
    const isFollowBack = loggedUser?.followers?.includes(profileId) ? true:false;

    useEffect(() => {
        axios({
            method: 'get',
            url: `https://us-central1-socialony.cloudfunctions.net/api/user/${profileId}`,
        }).then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    },[profileId, refresh])
    
    const RenderPosts = () => {
        if(user) {
            return user.posts.map((post, index) => (
                <Post 
                    key={index}
                    user={user?.credentials}
                    post={post}
                />
            ))
        }
    }

    const followUser = () => {
        
        const key = 'updatable';
        message.loading({ content: 'Following...', key });
        const url = `https://us-central1-socialony.cloudfunctions.net/api/user/${profileId}/${isUserFollow ? 'unfollow':'follow'}`;
        axios({
            method: 'post',
            url,
            data: {
                followerId: loggedUser.userId
            }
        })
        .then(() => {
            message.success({ content: `User ${!isUserFollow ? 'Followed!':'Unfollowed!'}`, key, duration: 2 });
        })
        .then(() => {
            axios({
                method: 'post',
                url: 'https://us-central1-socialony.cloudfunctions.net/api/currentUser',
                data: {
                    userId: loggedUser.userId
                }
            })
            .then((newUser) => dispatch(setUser(newUser.data)))
        })
        .catch((err) => console.log(err));
    }

    const renderButtons = () => {
        if(!isLogged){
            
        } else {
            if(loggedUser.userId === profileId) {
                return <React.Fragment></React.Fragment>
            }
            return (
                <React.Fragment>
                    <Grid item xs={6} className={classes.buttongrid} onClick={followUser}>
                        <Button variant="contained" color="primary">{!isUserFollow ? 'Follow':'Unfollow'}</Button>
                    </Grid>
                    <Grid item xs={6} className={classes.buttongrid}>
                        <Button variant="contained" color="primary">Message</Button>
                    </Grid>	
                </React.Fragment>
            )
        } 
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={1} lg={2} />
            <Grid item xs={10} lg={8}>
                <Grid container className={classes.pageheader} alignItems="center" spacing={2}>
                    <Grid item xs={12} lg={2} className={classes.leftheader}>
                        <img 
                            className={classes.profilepicture}
                            src={user?.credentials.imageUrl}
                            alt="pp"
                        />
                    </Grid>
                    <Grid item container xs={12} lg={3} justify="center" alignItems="center" direction="column">
                        <Typography variant="body1" align="center" className={classes.name}>
                            {user?.credentials.name} {user?.credentials.surname}
                        </Typography> 
                        <Typography variant="subtitle1" className={classes.isFollows}>
                            {isFollowBack && 'Follows You'}
                        </Typography>
                    </Grid>
                    <Grid item container justify="center" alignItems="center" xs={12} lg={7} spacing={2}>
                        <Grid item xs={1} lg={2} />
                        <Grid item xs={5} lg={2}>
                            <p className={classes.stats}>{user?.credentials.followsCount}</p>
                            <p className={classes.label}>FOLLOWS</p>
                        </Grid>
                        <Grid item xs={5} lg={2}>
                            <p className={classes.stats}>{user?.credentials.followersCount}</p>
                            <p className={classes.label}>FOLLOWERS</p>
                        </Grid>
                        <Grid item xs={1} lg={1} />
                        <Grid item container xs={12} lg={5} spacing={2}>
                            {renderButtons()}
                        </Grid>
                        
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Grid item container lg={8}>
                        {RenderPosts()}
                    </Grid>					
                </Grid>
            </Grid>
            <Grid item xs={1} lg={2} />
        </Grid>
    )
}

export default withRouter(User);

const useStyle = makeStyles((theme) => ({
    root: {
        paddingTop: "90px",
        paddingBottom: "60px"
    },
    pageheader: {
        padding: "15px",
        backgroundColor: "#333",
        borderRadius: "5px",
        marginBottom: "50px"
    },
    leftheader: {
        position: "relative",
        height: "max-content",
        marginBottom: "20px",
    },
    profilepicture: {
        width: "110px",
        height: "110px",
        position: "absolute",
        bottom: "-100%",
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto", 
        objectFit: "cover",
        objectPosition: "center center",
        borderRadius: "50%",
        border: "2px solid #fff",
        backgroundColor: "white"
    },
    name: {
        fontSize: "2rem !important",
        fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
        fontWeight: "bolder",
        color: "#fff",
        marginLeft: '10px'
    },
    stats: {
        fontSize: "2rem !important",
        fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
        fontWeight: "400",
        marginBottom: "0 !important",
        textAlign: "center",
        color: "#fff"
    },
    label: {
        fontSize: "1rem",
        fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
        fontWeight: "700",
        textAlign: "center",
        color: "#fff"
    },
    buttongrid: {
        display: "grid"
    },
    isFollows: {
        color: "whitesmoke"
    }
    
}))
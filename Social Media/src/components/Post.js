import React, { useState } from 'react';
import { Grid, Typography, Card, CardActions, CardHeader, CardContent, Avatar, IconButton, } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import { makeStyles } from '@material-ui/core/styles';
import { Icon, Input } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged, getUser } from '../features/userSlice';
import { refresh } from '../features/status';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const Post = ({ post, history }) => {
	const classes = useStyle();
	const isLogged = useSelector(getIsLogged);
	const loggedUser = useSelector(getUser);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

	const likeHandler = () => {
        if(!isLogged){
            history.push('/login')
        } else {
            axios({
                method: 'post',
                url: `https://us-central1-socialony.cloudfunctions.net/api/post/${post.postId}/like`,
                data: {
                    userId: loggedUser.userId
                },headers: {
                    "Content-Type": "application/json"
                }
            }).then((a) => {
                dispatch(refresh());
            })
            .catch((err) => console.log(err));
        }
	}

	const commentHandler = () => {
        if(!isLogged){
            history.push('/login')
        } else {
            axios({
                method: 'post',
                url: `https://us-central1-socialony.cloudfunctions.net/api/post/${post.postId}/comment`,
                data: {
                    userId: loggedUser.userId,
                    content: comment
                },headers: {
                    "Content-Type": "application/json"
                }
            }).then(() => {
                setComment('');
                dispatch(refresh());
            })
            .catch((err) => console.log(err));
        }
	}

	return (
		<Card className={classes.card}>
            <Link to={`/user/${post?.userId}`}>
                <CardHeader
                    avatar={
                    <Avatar 
                        src="user?.imageUrl"
                    />
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={`${post?.name} ${post?.surname}`}
                    subheader={post?.createdAt}
                />
            </Link>
			
			<CardContent>
				<Typography variant="body1" color="textSecondary" component="p" className={classes.content}>
					{post?.content}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Grid container>
					<Grid item xs={12} lg={"auto"} className={classes.cardbutton}>
						<span>
                        <IconButton aria-label="like" style={{ padding: "10px"}} onClick={likeHandler}>
									<FavoriteIcon />
								</IconButton>					
							{post?.likesCount}
						</span>
						<span>
                            <IconButton aria-label="comment" style={{ padding: "10px"}} onClick={commentHandler}>
                                <CommentIcon />
                            </IconButton>								
							{post?.commentsCount}
						</span>
					</Grid>
					<Grid item xs={12} lg={true}>
						<Input 
							className={classes.comment} 
							icon={
								<Icon 
									onClick={commentHandler}
									name='paper plane' 
									inverted 
									circular 
									link 
								/>
							} 
							value={comment}
							onChange={(e) => setComment(e.target.value)} 
							placeholder='Comment...' />
					</Grid>

				</Grid>
				

			</CardActions>
		</Card>
	)
}

export default withRouter(Post)

const useStyle = makeStyles((theme) => ({
	card: {
		width: "100%",
		marginBottom: "25px"
	},
	comment: {
        width: "100%",
        "& input:focus" : {
            background: "whitesmoke !important"
        },
        "& input": {
            border: "none !important",
		}
	},
	content: {
		padding: "0 20px"
	},
	cardbutton: {
		marginRight: "10px"
	}
}))
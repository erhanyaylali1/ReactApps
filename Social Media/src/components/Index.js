import React,{ useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser, getIsLogged } from '../features/userSlice';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Input, message } from 'antd';
import { Button } from 'semantic-ui-react';
import Post from './Post';
import { getRefresh } from '../features/status';
import { Link } from 'react-router-dom';


const { TextArea } = Input;

const Index = () => {

	const user = useSelector(getUser);
	const isLogged = useSelector(getIsLogged);
	const classes = useStyles();
    const refresh = useSelector(getRefresh);
	const [posts, setPosts] = useState(null);
	const [newPost, setNewPost] = useState('');

	useEffect(() => {
		if(isLogged){
            axios({
                method: 'get',
                url: `https://us-central1-socialony.cloudfunctions.net/api/user/${user.userId}/home`,
            }).then((res) => setPosts(res.data))
            .catch((err) => {
                console.log(err)}
            );
		}
	},[newPost, isLogged, user.userId, refresh]);


	const SubmitNewPost = (e) => {
        
        const key = 'updatable';
        message.loading({ content: 'Sending New Post...', key });
		e.preventDefault();
        if(newPost === ''){
            message.error({ content: 'Empty Post Can Not Be Shared!', key, duration: 2 });
        } else {
            if(isLogged){
                axios({
                    method: 'post',
                    url: "https://us-central1-socialony.cloudfunctions.net/api/post",
                    data: {
                        userId: user.userId,
                        content: newPost
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((e) => {
                    setNewPost('');
                    message.success({ content: 'New Post Sent!', key, duration: 2 });
                })
                .catch((err) => console.log(err));
            }
        }		
	}

	const RenderPosts = () => {
		if(posts) {
			return posts.map((post, index) => (
				<Post 
					key={index}
					post={post}
				/>
			))
		}
	}
    
    return (
		<div>
			<Grid container >
				<Grid item xs={1} lg={3} />
				<Grid item container xs={10} lg={6} className={classes.root}>
					<Grid item xs={12} className={classes.salude}>
						<Typography variant="h4" align="center">
							{isLogged ? `Welcome ${user.credentials.name}` : 'LOGIN PLEASE'}
						</Typography>
					</Grid>
					<Grid item container xs={12} spacing={2} className={classes.newpostdiv}>
						{isLogged ? (
							<React.Fragment>
								<Grid item xs={12} lg={10}>
									<TextArea 
                                        placeholder="Enter Your Thoughts..."
										className={classes.newpost}
										value={newPost}
										onChange={(e) => setNewPost(e.target.value)}
										rows={4} 
									/>
								</Grid>
								<Grid item xs={12} lg={2} onClick={SubmitNewPost} className={classes.inputButtons}>
									<Button fluid color="facebook">Send</Button>
									<Button fluid color="red">Cancel</Button>
								</Grid>
							</React.Fragment>
						):(<React.Fragment></React.Fragment>)}
					</Grid>
					<Grid item container xs={12} className={classes.posts}>
                        {isLogged ? RenderPosts():(
                            <Grid item container xs={12} justify="center">
                                <Link to="/login">
                                    <Button variant="contained" color="facebook">LOGIN</Button>
                                </Link>
                            </Grid>
                        )}		
					</Grid>
					
				</Grid>
				<Grid item xs={1} lg={3} />
			</Grid>
		</div>
	)
}

export default Index


const useStyles = makeStyles({
	root: {
		paddingTop: "40px"
	},
	salude : {
		marginBottom: "30px"
	},
	newpostdiv: {
		marginBottom: "10px"
	},
	newpost: {
		border: "none !important",	
		padding: "20px",
		backgroundColor: "white",
		boxShadow: "1px 1px 5px 0px rgb(0 0 0 / 75%)"
		
	},
	inputButtons: {
		"& button": {
			marginTop: "10px !important"
		}
	},
	posts: {
		borderTop: "2px solid #828282",
		paddingTop: "35px"
	}
});
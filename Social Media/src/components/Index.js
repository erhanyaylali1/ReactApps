import React,{ useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser, getIsLogged } from '../features/userSlice';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Input } from 'antd';
import { Button } from 'semantic-ui-react';
import Post from './Post';
import { getRefresh } from '../features/status';


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
			.catch((err) => console.log(err));
		}
	},[newPost, isLogged, user.userId, refresh]);

	const SubmitNewPost = (e) => {
		e.preventDefault();
        if(isLogged){
            axios({
                method: 'post',
                url: "https://us-central1-socialony.cloudfunctions.net/api/post",
                data: {
                    userId: user.userId,
                    content: newPost
                },headers: {
                    "Content-Type": "application/json"
                }
            }).then((e) => {
                setNewPost('');
            })
            .catch((err) => console.log(err));
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
							{isLogged ? `Welcome ${user.name}` : 'LOGIN PLEASE'}
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
						):(
							<p>LOGIN</p>
						)}
					</Grid>
					<Grid item container xs={12} className={classes.posts}>
						{RenderPosts()}		
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
		backgroundColor: "ghostwhite",
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
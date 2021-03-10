import React from 'react';
import { Grid, Typography, Card, CardActions, CardHeader, CardContent, Avatar, IconButton, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Icon, Input } from 'semantic-ui-react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';


const User = () => {
	const classes = useStyle();
	return (
		<Grid container className={classes.root}>
			<Grid xs={1} lg={2} />
			<Grid xs={10} lg={8}>
				<Grid container className={classes.pageheader} alignItems="center" spacing={2}>
					<Grid item xs={12} lg={2} className={classes.leftheader}>
						<img 
							className={classes.profilepicture}
							src="https://lh3.googleusercontent.com/proxy/qg-AjG5v0uG33OABc4yhOQoJmJuoDVa-SxyFb7KuCbLJy1GBiz41At7pXK5QCFD3cKNPTCxKi8n-0WaweKa2xfr8g5RtUnI8PHW0ebohMQTjYnbm9r1P"
                            alt="pp"
						/>
					</Grid>
					<Grid item xs={12} lg={3} justify="center" alignItems="center">
						<Typography variant="body1" align="center" className={classes.name}>Erhan Yaylalı</Typography> 
					</Grid>
					<Grid item container justify="center" alignItems="center" xs={12} lg={7} spacing={2}>
						<Grid xs={0} lg={2} />
						<Grid item xs={5} lg={2}>
							<p className={classes.stats}>196</p>
							<p className={classes.label}>FOLLOWS</p>
						</Grid>
						<Grid item xs={5} lg={2}>
							<p className={classes.stats}>254</p>
							<p className={classes.label}>FOLLOWERS</p>
						</Grid>
						<Grid xs={0} lg={1} />
						<Grid item container xs={12} lg={5} spacing={2}>
							<Grid item xs={6} className={classes.buttongrid}>
								<Button inverted fullWidth color="standart">Follow</Button>
							</Grid>
							<Grid item xs={6} className={classes.buttongrid}>
								<Button inverted fullWidth color="standart">Message</Button>
							</Grid>							
						</Grid>
						
					</Grid>
				</Grid>
				<Grid container justify="center">
					<Card className={classes.card}>
						<CardHeader
							avatar={
							<Avatar aria-label="recipe">
								R
							</Avatar>
							}
							action={
							<IconButton aria-label="settings">
								<MoreVertIcon />
							</IconButton>
							}
							title="Shrimp and Chorizo Paella"
							subheader="September 14, 2016"
						/>
						<CardContent>
							<Typography variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
							</Typography>
						</CardContent>
						<CardActions disableSpacing>
                            <Grid container>
                                <Grid item xs={12} lg={"auto"} className={classes.cardbutton}>
                                    <span>
                                        <IconButton aria-label="like" style={{ padding: "10px"}} >
                                            <FavoriteIcon />
                                        </IconButton>
                                        15
                                    </span>
                                    <span>
                                        <IconButton aria-label="comment" style={{ padding: "10px"}} >
                                            <CommentIcon />
                                        </IconButton>
                                        2
                                    </span>
                                </Grid>
                                <Grid item xs={12} lg={true} gutterBottom>
                                    <Input 
                                        className={classes.comment} 
                                        icon={
                                            <Icon 
                                                name='paper plane' 
                                                inverted 
                                                circular 
                                                link 
                                            />
                                        } 
                                        placeholder='Comment...' />
                                </Grid>

                            </Grid>
							

						</CardActions>
					</Card>
				</Grid>
			</Grid>
			<Grid xs={1} lg={2} />
		</Grid>
	)
}

export default User

const useStyle = makeStyles((theme) => ({
	root: {
		paddingTop: "90px",
        paddingBottom: "60px"
	},
	pageheader: {
        
		padding: "15px",
		backgroundColor: "#333333",
		borderRadius: "5px",
		marginBottom: "50px"
	},
	leftheader: {
        position: "relative",
		height: "max-content",
        marginBottom: "20px"    
	},
	profilepicture: {
		width: "110px",
		height: "auto",
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
    comment: {
        width: "100%",
        "& input:focus" : {
            background: "whitesmoke !important"
        },
        "& input": {
            border: "none !important",
        }
    }
}))
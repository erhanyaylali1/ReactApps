import React,{ useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Input } from 'semantic-ui-react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSelector } from 'react-redux';
import { getIsNavbarOpen } from '../features/status';
import './styles.css';

const Messages = () => {
	const classes = useStyle();
	const [width, setWindowWidth] = useState(0);
	const left = useRef();
	const right = useRef();
    const isOpen = useSelector(getIsNavbarOpen);

	useEffect(() => {
		if(width < 450){			
			left.current.style.display = "flex";
			right.current.style.display = "none";
		} else {
			left.current.style.display = "flex";
			right.current.style.display = "flex";
		}
	},[width])

	useEffect(() => { 
		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		return () => 
		  window.removeEventListener("resize",updateDimensions);
	}, [])

	const updateDimensions = () => {
		const width = window.innerWidth;
		setWindowWidth(width);
	}

	const chatClick = () => {
		if(width < 450) {
			left.current.style.display = "none";
			right.current.style.display = "flex";
		}
	}

	const back = () => {
		left.current.style.display = "flex";
		right.current.style.display = "none";
	}

	return (
		<Grid container className={classes.root} style={{ height: isOpen ? "75vh":"88vh" }}>
			<Grid item container xs={12} lg={12} className={classes.main}  style={{ height: isOpen ? "75vh":"88vh" }}>
				<Grid item container xS={12} lg={4} className={classes.left} ref={left}>
					<Grid container item className={classes.header}>
						<Avatar
							className={classes.headeravatar}
							src="https://media-exp1.licdn.com/dms/image/C4D03AQE-dMTNZd32Mw/profile-displayphoto-shrink_800_800/0/1571955234521?e=1620864000&v=beta&t=HiC9p81AlLhU793ushlpvn-d8HvleZu2LU4xPfXo0jQ"
							alt="user pp"
						/>
						<Grid>
							<Typography variant="h5" style={{ fontWeight: "bolder" }}>Erhan Yaylalı </Typography>
							<Typography variant="body1">
								Online
							</Typography>
						</Grid>
					</Grid>
					<Grid container item className={classes.title}>
						<Typography variant="h5" style={{ fontWeight: "bolder" }}>Conversations</Typography>					
					</Grid>
					<Grid container item direction="column" className={classes.chats}>
						<Grid container item alignItems="center" className={classes.each} onClick={chatClick}>
							<Avatar
								className={classes.chatavatar}
								src="https://media-exp1.licdn.com/dms/image/C4D03AQE-dMTNZd32Mw/profile-displayphoto-shrink_800_800/0/1571955234521?e=1620864000&v=beta&t=HiC9p81AlLhU793ushlpvn-d8HvleZu2LU4xPfXo0jQ"
								alt="user pp"
							/>
							<Typography variant="h6">Erhan Yaylalı</Typography>
						</Grid>
						<Grid container item alignItems="center" className={classes.each} onClick={chatClick}>
							<Avatar
								className={classes.chatavatar}
								src="https://media-exp1.licdn.com/dms/image/C4D03AQE-dMTNZd32Mw/profile-displayphoto-shrink_800_800/0/1571955234521?e=1620864000&v=beta&t=HiC9p81AlLhU793ushlpvn-d8HvleZu2LU4xPfXo0jQ"
								alt="user pp"
							/>
							<Typography variant="h6">Erhan Yaylalı</Typography>
						</Grid>
						<Grid container item alignItems="center" className={classes.each} onClick={chatClick}>
							<Avatar
								className={classes.chatavatar}
								src="https://media-exp1.licdn.com/dms/image/C4D03AQE-dMTNZd32Mw/profile-displayphoto-shrink_800_800/0/1571955234521?e=1620864000&v=beta&t=HiC9p81AlLhU793ushlpvn-d8HvleZu2LU4xPfXo0jQ"
								alt="user pp"
							/>
							<Typography variant="h6">Erhan Yaylalı</Typography>
						</Grid>
						<Grid container item alignItems="center" className={classes.each} onClick={chatClick}>
							<Avatar
								className={classes.chatavatar}
								src="https://media-exp1.licdn.com/dms/image/C4D03AQE-dMTNZd32Mw/profile-displayphoto-shrink_800_800/0/1571955234521?e=1620864000&v=beta&t=HiC9p81AlLhU793ushlpvn-d8HvleZu2LU4xPfXo0jQ"
								alt="user pp"
							/>
							<Typography variant="h6">Erhan Yaylalı</Typography>
						</Grid>
						<Grid container item alignItems="center" className={classes.each} onClick={chatClick}>
							<Avatar
								className={classes.chatavatar}
								src="https://media-exp1.licdn.com/dms/image/C4D03AQE-dMTNZd32Mw/profile-displayphoto-shrink_800_800/0/1571955234521?e=1620864000&v=beta&t=HiC9p81AlLhU793ushlpvn-d8HvleZu2LU4xPfXo0jQ"
								alt="user pp"
							/>
							<Typography variant="h6">Erhan Yaylalı</Typography>
						</Grid>
						<Grid container item alignItems="center" className={classes.each} onClick={chatClick}>
							<Avatar
								className={classes.chatavatar}
								src="https://media-exp1.licdn.com/dms/image/C4D03AQE-dMTNZd32Mw/profile-displayphoto-shrink_800_800/0/1571955234521?e=1620864000&v=beta&t=HiC9p81AlLhU793ushlpvn-d8HvleZu2LU4xPfXo0jQ"
								alt="user pp"
							/>
							<Typography variant="h6">Erhan Yaylalı</Typography>
						</Grid>
						<Grid container item alignItems="center" className={classes.each} onClick={chatClick}>
							<Avatar
								className={classes.chatavatar}
								src="https://media-exp1.licdn.com/dms/image/C4D03AQE-dMTNZd32Mw/profile-displayphoto-shrink_800_800/0/1571955234521?e=1620864000&v=beta&t=HiC9p81AlLhU793ushlpvn-d8HvleZu2LU4xPfXo0jQ"
								alt="user pp"
							/>
							<Typography variant="h6">Erhan Yaylalı</Typography>
						</Grid>
						<Grid container item alignItems="center" className={classes.each} onClick={chatClick}>
							<Avatar
								className={classes.chatavatar}
								src="https://media-exp1.licdn.com/dms/image/C4D03AQE-dMTNZd32Mw/profile-displayphoto-shrink_800_800/0/1571955234521?e=1620864000&v=beta&t=HiC9p81AlLhU793ushlpvn-d8HvleZu2LU4xPfXo0jQ"
								alt="user pp"
							/>
							<Typography variant="h6">Erhan Yaylalı</Typography>
						</Grid>
						<Grid container item alignItems="center" className={classes.each} onClick={chatClick}>
							<Avatar
								className={classes.chatavatar}
								src="https://media-exp1.licdn.com/dms/image/C4D03AQE-dMTNZd32Mw/profile-displayphoto-shrink_800_800/0/1571955234521?e=1620864000&v=beta&t=HiC9p81AlLhU793ushlpvn-d8HvleZu2LU4xPfXo0jQ"
								alt="user pp"
							/>
							<Typography variant="h6">Erhan Yaylalı</Typography>
						</Grid>
						<Grid container item alignItems="center" className={classes.each} onClick={chatClick}>
							<Avatar
								className={classes.chatavatar}
								src="https://media-exp1.licdn.com/dms/image/C4D03AQE-dMTNZd32Mw/profile-displayphoto-shrink_800_800/0/1571955234521?e=1620864000&v=beta&t=HiC9p81AlLhU793ushlpvn-d8HvleZu2LU4xPfXo0jQ"
								alt="user pp"
							/>
							<Typography variant="h6">Erhan Yaylalı</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item container xs={12} lg={8} className={classes.right} ref={right}>
					<Grid item container justify="flex-start" alignItems="center" className={classes.messageheader}>
						{width < 450 && (
							<ArrowBackIcon 
								className={classes.backicon} 
								onClick={back}
							/>
						)}
						<Typography variant="h5">Erhan Yaylalı</Typography>
						<IconButton aria-label="settings" className={classes.headersettings}>
							<MoreVertIcon />
						</IconButton>
					</Grid>
					<Grid item container className={classes.chatmessages}>
						<Grid item container className={classes.input}>
						<Input
							placeholder='Send...'
						/>
						</Grid>
						<Grid item container className={classes.messages}>
							<Grid item container lg={12} className={classes.message}>
								<div>
									<Typography variant="body1">
										This is first message, I am keeping this message as long as possible to see 
										how it behaves when a long text comes.This is first message, I am keeping this message as long as possible to see 
										how it behaves when a long text comes.
									</Typography>
									<Typography variant="button" align="right">12.46</Typography>
								</div>
							</Grid>											
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>

	)
}

export default Messages


const useStyle = makeStyles((theme) => ({
	
	root: {
		paddingTop: "0px",
	},
	left: {
		backgroundColor: "#ffffff",
		padding: "0px",
		flexDirection: "column",
		flex: "1",
	},
	right: {
		display: "none",
		backgroundColor: "#eceef1",
		flexDirection: "column",
		padding: "10px 20px 5px 20px"
	},
	headeravatar: {
		height: "60px",
		width: "60px",
		marginRight: "20px"
	},
	header: {
		height: "fit-content",
		flexDirection: "row",
		alignItems: "center",
		padding: "30px 30px 10px 30px",
		heigh: "15vh"
	},
	chatavatar: {
		height: "40px",
		width: "40px",
		marginRight: "5px"
	},
	chats: {
		height: "65vh",
		flexDirection: "row",
		overflowY: "scroll"
	},
	title: {
		padding: "20px",
		paddingBottom: "10px",
		height: "10vh"
	}, 
	each: {
		cursor: "pointer",
		padding: "10px 30px",
		"& h6": {
			marginLeft: "15px",
			fontSize: "1.5rem !important"
		},
		"&:hover": {
			backgroundColor: "#f0f3f7"
		}
	},
	messageheader: {
		padding: "5px 0 10px 10px",
		borderBottom: "1px solid #c7c7c7"
	},
	backicon: {
		marginRight: "20px"
	},
	headersettings: {
		marginLeft: "auto",
	},
	chatmessages: {
		flex: "1",
		paddingBottom: "10px",
		alignContent: "flex-end",
		flexDirection: "column-reverse"
	},
	input: {
		padding: "5px 10px 5px 10px",
		flex: 0.1,
		"& div": {
			flex: "1",
		},
		"& input": {
			borderRadius: "20px !important",
			paddingRight: "90px !important",
			paddingLeft: "20px !important",
			backgroundColor: "transparent !important",
			height: "40px",
            border: "2px solid rgb(61 19 141) !important"
		},
		"& button": {
			position: "absolute",
			right: "-3px",
			height: "40px",
			borderRadius: "20px !important"
		}
	},
	messages: {
		maxHeight: "60vh",
		overflowY: "scroll"
	},
	message: {
		height: "fit-content",
		marginBottom: "20px",
		padding: "0 10px",
		"&::-webkit-scrollbar" : {
			display: "none"
		},
		"& div": {
			display: "flex",
			flexDirection: "column",
			backgroundColor: "#fff",
			height: "fit-content",
			padding: "10px 15px 2px 15px",
			borderRadius: "15px",
			borderTopLeftRadius: "0px"
		}
	},
}))
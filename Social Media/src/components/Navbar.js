import React,{ useEffect, useState } from 'react';
import { Grommet } from 'grommet';
import { Grommet as GrommetIcon } from 'grommet-icons';
import { grommet } from 'grommet/themes';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from 'antd';
import { SearchOutlined, DownCircleOutlined } from '@ant-design/icons';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getIsNavbarOpen, toggleNavbar } from '../features/status';
import './styles.css';
import { getIsLogged, logout as signOut, getUser } from '../features/userSlice';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Navbar = (props) => {

	const classes = useStyles();
	const isLogged = useSelector(getIsLogged);
	const isOpen = useSelector(getIsNavbarOpen);
	const user = useSelector(getUser);
    const dispatch = useDispatch();
	const [width, setWindowWidth] = useState(0);

	useEffect(() => { 
		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		return () => 
		  window.removeEventListener("resize",updateDimensions);
	}, [])

	const updateDimensions = () => {
		const width = window.innerWidth
		setWindowWidth(width)
	};

    const logout = () => {

        axios({
            method: 'POST',
            url: "https://us-central1-socialony.cloudfunctions.net/api/logout",
        })
        .then(() => {
			dispatch(signOut());
			props.history.push("/login")
		})
        .catch((error) => console.log(error));
    }
	
	return (
		<Grommet theme={grommet}>	
			<Grid className={classes.root} style={{ backgroundColor: "#333333", height: isOpen ? "21vh":"8vh" }}>
				<Grid alignItems="center" justify="space-around"  container>
					<Grid container item xs={11} lg={2} justify="flex-start">
						<Link to="/" className={classes.brand}>
                            <GrommetIcon color="status-warning" />
                            <p className={classes.link3}>Socialony</p>
						</Link>
					</Grid>

					<Grid item xs={1} onClick={() => dispatch(toggleNavbar())} style={{ display: width < 450 ? 'flex':'none'}}>
						<DownCircleOutlined style={{ color: "white", transform: isOpen ? 'rotate(180deg)':'rotate(0deg)' }}/>
					</Grid>
					
					<Grid item xs={12} lg={6} style={{ display: (width < 450) ? (isOpen ? 'flex':'none'):'flex' }}>
						<Input placeholder="Search..." suffix={<SearchOutlined />} className={classes.searchdiv}/>
					</Grid>
					<Grid item container xs={12} lg={4} spacing={2} 
						style={{ display: (width < 450) ? (isOpen ? 'flex':'none'):'flex', justifyContent: width < 450 ? 'space-around':'flex-end'
					 }}>
						{isLogged ? (
							<React.Fragment>
								<Grid item style={{ padding: width < 450 ? '5px 0':'5px 10px' }}>
									<Link to="/messages" >
										<p className={classes.link3}>Messages</p>
									</Link>	
								</Grid>
								<Grid item style={{ padding: width < 450 ? '5px 0':'5px 10px' }}>
									<Link to="/notifications" >
                                        <p className={classes.link3}>Notifications</p>
									</Link>	
								</Grid>
								<Grid item style={{ padding: width < 450 ? '5px 0':'5px 10px' }}>
									<Link to={`/user/${user.userId}`} >
                                        <p className={classes.link3}>Profile</p>
									</Link>	
								</Grid>
                                <Grid item style={{ padding: width < 450 ? '5px 0':'5px 10px', cursor: "pointer" }} onClick={logout}>
                                    <p className={classes.link3}>Logout</p>
								</Grid>
							</React.Fragment>
						):(
							<React.Fragment>
								<Grid item>
									<Link to="/login">
                                        <p className={classes.link3}>Login</p>
									</Link>
								</Grid>
								<Grid item>
									<Link to="/register" >
                                        <p className={classes.link3}>Register</p>
									</Link>	
								</Grid>
							</React.Fragment>
						)}
						
					</Grid>
				</Grid>
			</Grid>
		</Grommet>
	)
}

export default withRouter(Navbar);


const useStyles = makeStyles({
	root: {
		padding: "10px 15px !important",
		display: "flex",
		alignItem: "center",
		justifyContent: "space-around !important"
	},
	brand: {
        display: "flex",
        alignItems: "center",
        "& p": {
            marginLeft: "10px",
            color: "white"
        }
	},
	link: {
	  padding: '8px 20px'
	},
	link2: {
        display: "flex",
		"&:hover": {
			color: "#FFAA15"
		}
	},
	link3: {
		fontSize: "1.2rem !important",
        color: "white",
		"&:hover": {
			color: "#FFAA15"
		}
	},
	searchdiv: {
		flex: 1,
		borderRadius: "15px",
		padding: "5px 20px",
		border: "none",
		"& span.ant-input-suffix:hover" : {
			cursor: "pointer",
			transform: "scale(1.2)"
		}
	}
});
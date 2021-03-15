import React,{ useEffect, useState, useRef } from 'react';
import { Grommet } from 'grommet';
import { Grommet as GrommetIcon } from 'grommet-icons';
import { grommet } from 'grommet/themes';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from 'antd';
import { SearchOutlined, DownCircleOutlined } from '@ant-design/icons';
import { Avatar, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getIsNavbarOpen, toggleNavbar } from '../features/status';
import './styles.css';
import { getIsLogged, logout as signOut, getUser } from '../features/userSlice';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';

const Navbar = (props) => {

	const classes = useStyles();
	const isLogged = useSelector(getIsLogged);
	const isOpen = useSelector(getIsNavbarOpen);
	const user = useSelector(getUser);
    const dispatch = useDispatch();
	const [width, setWindowWidth] = useState(0);
    const [showSearch, setShowSearch] = useState(false);
    const [key, setKey] = useState('');
    const [results, setResults] = useState([]);
    const searchRef = useRef(null);
    const searchBar = useRef(null);

	useEffect(() => { 
		updateDimensions();
		window.addEventListener("resize", updateDimensions);
        document.addEventListener('click', (e) => {
            if(!searchRef.current?.contains(e.target)) {
                setShowSearch(false);
            } 
            if(searchBar.current?.contains(e.target)) {
                setShowSearch(true);
            }
        });
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

    const search = (term) => {
        if(term) {
            setShowSearch(true);
            axios({
                method: 'GET',
                url: `https://us-central1-socialony.cloudfunctions.net/api/search/${term}`,
            })
            .then((respond) => {
                setResults(respond.data);
            })
        }
    }

    const renderResults = () => {
        return results.map((result, index) => {
            return (
                <Link style={{ width: "100%"}} to={`/user/${result.id}`} key={index} onClick={() => {
                    setShowSearch(false)
                    setKey('');    
                }}>
                    <Grid item container xs={12} alignItems="center" className={classes.eachresult}>
                        <Avatar 
                            src={result.imageUrl}
                        />
                        <span>{`${result.name} ${result.surname}`}</span>
                    </Grid>
                </Link>
            )
        })
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
					
					<Grid item container xs={12} lg={6} style={{ display: (width < 450) ? (isOpen ? 'flex':'none'):'flex' }} className={classes.navbarsearch}>
                        <Grid item container xs={12} ref={searchBar}>  
                            <Input placeholder="Search User..." suffix={<SearchOutlined />} 
                                className={classes.searchdiv}
                                value={key}
                                onInput={(e) => {
                                    setKey(e.target.value)
                                    search(e.target.value)
                                }}
                            />
                        </Grid>						
                        <Grid item container xs={11} lg={7} 
                            className={classes.searchresults} 
                            style={{ display: showSearch ? ( results.length ? 'flex':'none'):'none' }}
                            ref={searchRef}
                        >
                            {renderResults()}
                        </Grid>
					</Grid>
					<Grid item container xs={12} lg={4} spacing={2} alignItems="center"
                        className={classes.navbarButtonsDiv}
						style={{ display: (width < 450) ? (isOpen ? 'flex':'none'):'flex', justifyContent: width < 450 ? 'space-around':'flex-end'
					 }}>
						{isLogged ? (
							<React.Fragment>
                                <Grid item style={{ padding: width < 450 ? '5px 0':'5px 10px' }}>
									<Link to="/" >
										<Grid className={classes.link3}><HomeIcon /></Grid>
									</Link>	
								</Grid>
								<Grid item style={{ padding: width < 450 ? '5px 0':'5px 10px' }}>
									<Link to="/messages" >
										<Grid className={classes.link3}><MailOutlineIcon /></Grid>
									</Link>	
								</Grid>
								<Grid item style={{ padding: width < 450 ? '5px 0':'5px 10px' }}>
									<Link to="/notifications" >
                                        <Grid className={classes.link3}><NotificationsIcon /></Grid>
									</Link>	
								</Grid>
								<Grid item style={{ padding: width < 450 ? '5px 0':'5px 10px' }}>
									<Link to={`/user/${user.userId}`} >
                                        <Grid className={classes.link3}><PersonIcon /></Grid>
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
        display: "flex",
        alignItems: "center",
		"&:hover": {
			color: "#FFAA15"
		}
	},
    navbarsearch: {
        position: "relative",
        justifyContent: "flex-start"
    },
    searchresults: {
        position: "absolute",
        top: "140%",
        zIndex: "3",
        backgroundColor: "white",
        borderRadius: "5px",
        border: "1px solid #333",
        left: "20px",
        boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)"
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
	},
    navbarButtonsDiv: {
        paddingTop: "3px",
    },
    eachresult: {
        padding: "10px 15px",
        "& span": {
            marginLeft: "20px",
            color: "#333"
        },
        "&:hover": {
            backgroundColor: "#eee",
        }
    }
});
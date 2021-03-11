import React,{ useEffect, useState } from 'react';
import { Grommet, Anchor } from 'grommet';
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

const Navbar = () => {

	const classes = useStyles();
	const isLogged = true;
    const isOpen = useSelector(getIsNavbarOpen);
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
	
	return (
		<Grommet theme={grommet} style={{ height: isOpen ? "21vh":"8vh"}}>	
			<Grid className={classes.root} style={{ backgroundColor: "#333333", height: isOpen ? "21vh":"8vh" }}>
				<Grid alignItems="center" justify="space-around"  container>
					<Grid item xs={11} lg={2} justify="flex-start">
						<Link to="/" className={classes.brand}>
							<Anchor
								className={classes.link2}
								color="light-1"
								icon={<GrommetIcon color="status-warning" />}
								label="Socailony"
							/>
						</Link>
					</Grid>

					<Grid item xs={1} onClick={() => dispatch(toggleNavbar())} style={{ display: width < 450 ? 'flex':'none'}}>
						<DownCircleOutlined style={{ color: "white", transform: isOpen ? 'rotate(180deg)':'rotate(0deg)' }}/>
					</Grid>
					
					<Grid item xs={12} lg={6} style={{ display: (width < 450) ? (isOpen ? 'flex':'none'):'flex' }}>
						<Input placeholder="Search..." suffix={<SearchOutlined />} className={classes.searchdiv}/>
					</Grid>
					<Grid item container xs={12} lg={4} justify="flex-end" spacing={2} 
						style={{ display: (width < 450) ? (isOpen ? 'flex':'none'):'flex', justifyContent: width < 450 ? 'space-around':'flex-end'
					 }}>
						{isLogged ? (
							<React.Fragment>
								<Grid item style={{ padding: width < 450 ? '8px 0':'8px 10px' }}>
									<Link to="/">
										<Anchor
											className={classes.link3}
											color="light-1"
											label="Home"
										/>
									</Link>
								</Grid>
								<Grid item style={{ padding: width < 450 ? '8px 0':'8px 10px' }}>
									<Link to="/messages" >
										<Anchor
											className={classes.link3}
											color="light-1"
											label="Messages"
										/>
									</Link>	
								</Grid>
								<Grid item style={{ padding: width < 450 ? '8px 0':'8px 10px' }}>
									<Link to="/notifications" >
										<Anchor
											className={classes.link3}
											color="light-1"
											label="Notifications"
										/>
									</Link>	
								</Grid>
								<Grid item style={{ padding: width < 450 ? '8px 0':'8px 10px' }}>
									<Link to="/user" >
										<Anchor
											className={classes.link3}
											color="light-1"
											label="Profile"
										/>
									</Link>	
								</Grid>
							</React.Fragment>
						):(
							<React.Fragment>
								<Grid item>
									<Link to="/login">
										<Anchor
											className={classes.link3}
											color="light-1"
											label="Login"
										/>
									</Link>
								</Grid>
								<Grid item>
									<Link to="/register" >
										<Anchor
											className={classes.link3}
											color="light-1"
											label="Register"
										/>
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

export default Navbar;


const useStyles = makeStyles({
	root: {
		padding: "10px 15px !important",
		display: "flex",
		alignItem: "center",
		justifyContent: "space-around !important"
	},
	brand: {
		paddingTop: '3px'
	},
	link: {
	  padding: '8px 20px'
	},
	link2: {
		"&:hover": {
			color: "#FFAA15"
		}
	},
	link3: {
		fontSize: "1.2rem !important",
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
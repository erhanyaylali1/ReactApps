import React from 'react';
import { Grommet, Header, Anchor, Box, ResponsiveContext, Menu } from 'grommet';
import { Grommet as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import { grommet } from 'grommet/themes';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

const Navbar = () => {
	const classes = useStyles();
	return (
		<Grommet theme={grommet}>
			<Header background="dark-1" pad="small" height="xxsmall" className={classes.root}>
				<Link to="/" className={classes.brand}>
					<Anchor
						className={classes.link2}
						color="light-1"
						icon={<GrommetIcon color="status-warning" />}
						label="Socailony"
					/>
				</Link>
				<ResponsiveContext.Consumer>
					{(size) =>
						size === 'small' ? (
							<Box justify="end">
							<Menu
								a11yTitle="Navigation Menu"
								className={classes.openmenu}
								dropProps={{ align: { top: 'bottom', right: 'right' } }}
								icon={<MenuIcon color="light-1" />}
								items={[
								{
									label: (
												<Link to="/login" className={classes.link}>
													<Anchor
														color="light-1"
														label="Login"
													/>
												</Link>
											)
								},
								{
									label: (
												<Link to="/register" className={classes.link}>
													<Anchor
														color="light-1"
														label="Register"
													/>
												</Link>
											)
								},
								]}
							/>
							</Box>
						) : (
							<Box justify="end" direction="row" gap="medium">
								<Link to="/login">
									<Anchor
										className={classes.link3}
										color="light-1"
										label="Login"
									/>
								</Link>
								<Link to="/register" >
									<Anchor
										className={classes.link3}
										color="light-1"
										label="Register"
									/>
								</Link>							
							</Box>
						)
					}
				</ResponsiveContext.Consumer>
			</Header>
		</Grommet>
	)
}

export default Navbar;


const useStyles = makeStyles({
	root: {
		padding: "15px 25px !important",
		display: "flex",
		alignItem: "center",
		height: "fit-content !important"
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
	}
});
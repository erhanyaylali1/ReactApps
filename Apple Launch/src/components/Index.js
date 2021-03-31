import React from 'react'
import { Typography, makeStyles, Button, Grid } from '@material-ui/core'
import Features from './Features'
import ImageSlider from './ImageSlider'
import Statistics from './Statistics'
import Background from './Background'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'

const Index = () => {

	const classes = useStyle()

	return (
		<div className={classes.root}>
			
			<Background isSignIn={false} />
			<ImageSlider />
			<Features />
			<Statistics />

			<Grid container className={classes.buttonContainer}>
				<Grid item md={3} />
				<Grid item container md={2}>
					<Link to='/sign'>
						<Button color="primary">
								<Typography variant="body1">
									Sign Up form
								</Typography>
						</Button>
					</Link>
				</Grid>
				<Grid item md={2} />
				<Grid item container md={2}>
					<Link to='/contact'>
						<Button color="secondary">
							<Typography variant="body1">
								Contact with Us
							</Typography>
						</Button>
					</Link>
				</Grid>
				<Grid item md={3} />
			</Grid>
		</div>
	)
}

export default Index

const useStyle = makeStyles({
	root: {
		paddingBottom: '70px'
	},
	buttonContainer: {
		"& button": {
			width: '100%',
			padding: '10px 30px'
		},
		"& p": {
			fontSize: '17px'
		}
	},
})
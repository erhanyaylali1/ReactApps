import React from 'react'
import { makeStyles } from '@material-ui/core'
import Banner2 from '../assets/banner2.jpeg'

const Background = ({ isSignIn }) => {
	
	const classes = useStyles()
	return (
		<React.Fragment>
			<div style={{ marginBottom: isSignIn ? '150px': '0px'}}>
                <img 
                    alt="banner background"
                    className={!isSignIn ? classes.banner_img:classes.isSignIn_banner_img}
                    src={Banner2}
                />
			</div>
		</React.Fragment>
	)
}

export default Background

const useStyles = makeStyles({
	banner_img: {
		height: 'auto',
		width: '100%',
		marginBottom: '-200px',
		maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))'
	},
	isSignIn_banner_img: {
		height: 'auto',
		width: '100%',
		marginBottom: '-200px',
		background: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))'
	},
})
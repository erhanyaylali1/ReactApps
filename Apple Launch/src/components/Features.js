import React, { useEffect } from 'react'
import { Typography, Grid, Card, CardContent, CardActions, Button, makeStyles } from '@material-ui/core'
import WOW from "wow.js"

const Features = () => {
	
	const classes = useStyle()

	useEffect(() => {
		const wow = new WOW()
		wow.init();
	}, [])

	return (
        <React.Fragment>
            <div className={classes.title}>
                <Typography variant="h1" className="wow bounceInUp">
                    iPhone 11
                </Typography>
            </div>
		    <Grid container className={classes.features}>
				<Grid item md={3} justify="center">
					<div className="wow bounceInTop" data-wow-duration="1s" data-wow-delay="0.5s">
						<Card className={classes.card}>
							<CardContent className={classes.card_content}>
								<Typography color="textPrimary" variant="h5" gutterBottom>
									A13 Bionic Chip
								</Typography>
								<Typography color="textSecondary" gutterBottom>
									World Fastest #1 Mobile Processor. 
								</Typography>
							</CardContent>
							<CardActions className={classes.card_action}>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
					</div>		
					<div className="wow bounceInLeft " data-wow-duration="1s" data-wow-delay="0.5s">
						<Card className={classes.card}>
							<CardContent className={classes.card_content}>
								<Typography color="textPrimary" variant="h5" gutterBottom>
									IOS 14
								</Typography>
								<Typography color="textSecondary" gutterBottom>
									iOS is the world’s most personal and secure mobile operating system, packed with powerful features and designed to protect your privacy.
								</Typography>
							</CardContent>
							<CardActions className={classes.card_action}>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>					
					</div>	
				</Grid>
				<Grid item md={1} />
				<Grid item md={3} justify="center">
					<div className="wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.5s">
						<Card className={classes.card}>
							<CardContent className={classes.card_content}>
								<Typography color="textPrimary" variant="h5" gutterBottom>
									Dual 12MP Camera
								</Typography>
								<Typography color="textSecondary" gutterBottom>
									Take Gorgeous Photos. Even at Night. 4K video recording at 24 fps, 25 fps, 30 fps, or 60 fps
								</Typography>
							</CardContent>
							<CardActions className={classes.card_action}>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
					</div>
					<div className="wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.5s">
						<Card className={classes.card}>
							<CardContent className={classes.card_content}>
								<Typography color="textPrimary" variant="h5" gutterBottom>
									Retina HD Display
								</Typography>
								<Typography color="textSecondary" gutterBottom>
									6.1‑inch (diagonal) all-screen LCD Multi-Touch display with IPS technology
								</Typography>
							</CardContent>
							<CardActions className={classes.card_action}>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
					</div>
				</Grid>
				<Grid item md={1} />
				<Grid item md={3} justify="center">
					<div className="wow bounceInRight" data-wow-duration="1s" data-wow-delay="0.5s">
						<Card className={classes.card}>
							<CardContent className={classes.card_content}>
								<Typography color="textPrimary" variant="h5" gutterBottom>
									High Capacity
								</Typography>
								<Typography color="textSecondary" gutterBottom>
									64GB 128GB 256GB +
								</Typography>
							</CardContent>
							<CardActions className={classes.card_action}>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
					</div>
					<div className="wow bounceInRight" data-wow-duration="1s" data-wow-delay="0.5s">
						<Card className={classes.card}>
							<CardContent className={classes.card_content}>
								<Typography color="textPrimary" variant="h5" gutterBottom>
									Splash, Water, and Dust Resistant
								</Typography>
								<Typography color="textSecondary" gutterBottom>
									Rated IP68 (maximum depth of 2 meters up to 30 minutes) under IEC standard 60529
								</Typography>
							</CardContent>
							<CardActions className={classes.card_action}>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
					</div>
				</Grid>				
			</Grid>
        </React.Fragment>
	)
}

export default Features

const useStyle = makeStyles({
    title: {
        marginTop: '60px',
        textAlign: 'center'
    },
	features: {
		marginTop: '40px',
		justifyContent: 'space-evenly',
		padding: '0px 80px 40px 80px'
	},
	card: {
		padding: '15px !important',
		marginBottom: '30px',
		boxShadow: '1px 0px 1px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 24%), 0px 1px 3px 0px rgb(0 0 0 / 22%) !important'
	},
	card_content: {
		textAlign: 'center'
	},
	card_action: {
		display: 'flex',
		justifyContent: 'center'
	}
})
import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Carousel } from 'antd'
import slide1 from '../assets/gri.png'
import slide2 from '../assets/kırmızı.png'
import slide3 from '../assets/siyah.png'
import slide4 from '../assets/gri.png'
import slide5 from '../assets/beyaz.png'
import './styles.css'

const ImageSlider = () => {

	const classes = useStyle()

	return (
		<Carousel effect="fade" autoplay className={classes.slider_container}>
			<div className={classes.slider_image} style={{ height: '300px !important' }}>
				<img
					alt="logo 1"
					src={slide1}
				/>
			</div>
			<div className={classes.slider_image}>
				<img
					alt="logo 2"
					src={slide2}
				/>
			</div>
			<div className={classes.slider_image} style={{ height: '300px !important' }}>
				<img
					alt="logo 3"
					src={slide3}
				/>	
			</div>
            <div className={classes.slider_image} style={{ height: '300px !important' }}>
				<img
					alt="logo 4"
					src={slide4}
				/>	
			</div>
            <div className={classes.slider_image} style={{ height: '300px !important' }}>
				<img
					alt="logo 5"
					src={slide5}
				/>	
			</div>
		</Carousel>
	)
}

export default ImageSlider

const useStyle = makeStyles({
	slider_container: {
		display: 'flex',
		justifyContent: 'center'
	},
	slider_image: {
		display: 'flex !important',
		alignItems: 'center',
		justifyContent: 'center',
		"& img": {
			height: '500px'
		},
		paddingBottom: '40px'
	}
})
import React from 'react';
import './styles/Footer.css';
import PlayCirleOutlineIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import { Grid, Slider } from '@material-ui/core';
import { PlaylistPlay, VolumeDown } from '@material-ui/icons';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__left">
                <img 
                    src="https://i.pinimg.com/originals/59/9b/47/599b478f9e19f48e65ab25789a84fca9.jpg" 
                    alt="image_picture"
                    className="footer_albumLogo"
                />
                <div className="footer_songInfo">
                    <h4>Song Name</h4>
                    <p>Artist</p>
                </div>
            </div>
            <div className="footer__center">
                <ShuffleIcon className="footer__green" />
                <SkipPreviousIcon className="footer__icon" />
                <PlayCirleOutlineIcon fontSize="large" className="footer__icon footer__play"/>
                <SkipNextIcon className="footer__icon" />
                <RepeatIcon className="footer__green" />
                
            </div>
            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlay />
                    </Grid>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Footer

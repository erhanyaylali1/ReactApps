import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/logo.png';
import useStyles from './styles';


function Navbar({ itemNumbers }) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img 
                            src={logo} 
                            alt="Shopping App" 
                            height="25px"
                            className={classes.image}
                        />
                        Shopping App
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                        <IconButton aria-label="Show Cart Items" color="inherit">
                            <Badge badgeContent={itemNumbers} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Navbar

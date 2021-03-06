import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyle from './styles';

function Cart({ cart }) {

    const classes = useStyle();
    const isEmpty = !cart.line_items?.length;

    const EmptyCart = () => {
        return (
            <Typography variant="subtitle1">
                You have no items in your shopping cart,
                Start Adding some!
            </Typography>
        )
    }

    const FilledCart = () => {
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => {
                        return (
                            <Grid item xs={12} sm={6} key={item.id}>
                                <div>
                                    {item.name}
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant="h4">
                        Subtotal: { cart.subtotal.formatted_with_symbol }
                    </Typography>
                    <div>
                        <Button 
                            className={classes.emptyButton} 
                            size="large"
                            type="button"
                            variant="contained"
                            color="secondary"
                        >
                            Empty Cart
                        </Button>
                        <Button 
                            className={classes.checkout} 
                            size="large"
                            type="button"
                            variant="contained"
                            color="primary"
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    if(!cart.line_items) return 'Loading...';
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" >
                Your Shopping Cart
            </Typography>
            {isEmpty ? <EmptyCart />: <FilledCart />}
        </Container>
    )
}

export default Cart

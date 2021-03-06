import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyle from './styles';
import CartItem from './CartItem/CartItem';

function Cart({ cart, deleteItem, emptyCart, updateCart }) {

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
                <Grid container  spacing={3}>
                    {cart.line_items.map((item) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                                <CartItem 
                                    item={item}
                                    updateCart={updateCart}
                                    deleteItem={deleteItem}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid container spacing={2} gutterBottom className={classes.cardDetails}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4">
                            Subtotal: { cart.subtotal.formatted_with_symbol }
                        </Typography>
                    </Grid>                    
                    <Grid>
                        <Button 
                            className={classes.emptyButton} 
                            size="large"
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={emptyCart}
                        >
                            Empty Cart
                        </Button>
                        <Button 
                            className={classes.checkout} 
                            size="large"
                            type="button"
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/checkout"
                        >
                            Checkout
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    if(!cart.line_items) return 'Loading...';
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>
                Your Shopping Cart
            </Typography>
            {isEmpty ? <EmptyCart />: <FilledCart />}
        </Container>
    )
}

export default Cart

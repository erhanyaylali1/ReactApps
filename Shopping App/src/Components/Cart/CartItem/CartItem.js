import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({ item, updateCart, deleteItem }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia
                image={item.media.source}
                alt={item.name}
                className={classes.media}
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="h5" className={classes.productName}>
                    {item.name}
                </Typography> 
            </CardContent>
            <Grid container>
                <Typography variant="h6" className={classes.priceTag}>
                    {item.line_total.formatted_with_symbol}
                </Typography>  
            </Grid>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button 
                        type="button" 
                        size="small"
                        onClick={() => updateCart(item.id, item.quantity - 1)}
                    >
                        -
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button 
                        type="button" 
                        size="small"
                        onClick={() => updateCart(item.id, item.quantity + 1)}
                    >
                        +
                    </Button>
                </div>
                <Button 
                    variant="contained" 
                    type="button" 
                    color="secondary"
                    onClick={() => deleteItem(item.id)}
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    )
}

export default CartItem

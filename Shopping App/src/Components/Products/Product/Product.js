import React from 'react';
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

function Product({ product, onAddToCart }) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia 
                className={classes.media} 
                image={product?.media.source} 
                title={product?.name} 
            />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" className={classes.productName}>
                        {product?.name}
                    </Typography>
                </div>
                <Typography 
                    className={classes.productName}
                    dangerouslySetInnerHTML={{ __html: product?.description}}
                    variant="body2" 
                    color="textSecondary"
                >
                </Typography>
                <CardActions className={classes.CardActions}>
                    <Grid container align="center" direction="row">
                        <Grid style={{ display: 'flex', alignItems: 'center'}}>
                            <Typography variant="h6">
                                {product?.price.formatted_with_symbol}
                            </Typography>
                        </Grid>
                        <Grid item style={{ marginLeft: 'auto'}}>
                            <IconButton 
                                aria-label="Add to Cart"
                                onClick={() => onAddToCart(product?.id, 1)}
                            >
                                <AddShoppingCart />
                            </IconButton>
                        </Grid>
                        
                    </Grid>
                </CardActions>
            </CardContent>
        </Card>
    )   
}

export default Product

import React from "react";
import Product from "./Product/Product";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";

function Products({ products, onAddToCart }) {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => {
          return (
            <Grid item key={product?.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
}

export default Products;

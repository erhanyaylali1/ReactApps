import React from 'react';
import './styles/Product.css';
import _ from 'lodash';

const Product = ({ title, price, image, rating }) => {
    return (
        <div className="product">
            <div className="product__info">
                <p className="product__title">{ title }</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{ price }</strong>
                </p>
                <div className="product__rating">
                    {_.times(rating,() => <span>⭐</span>)}
                </div>
            </div>
            <img
                className="product__image"
                src={image}
                alt="product"
            />
            <button>Add to Basket</button>            
        </div>
    )
}

export default Product

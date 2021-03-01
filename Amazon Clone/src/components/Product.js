import React from 'react';
import './styles/Product.css';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { addToCard } from '../features/cardSlice';


const Product = ({ id, title, price, image, rating }) => {

    const dispatch = useDispatch();

    const addToBasket = () => {
        dispatch(addToCard({
            id,
            title,
            price,
            image,
            rating
        }))
    }

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
            <button onClick={addToBasket}>Add to Basket</button>            
        </div>
    )
}

export default Product
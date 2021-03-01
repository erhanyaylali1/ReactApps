import React from 'react';
import './styles/Checkout.css';
import Subtotal from './Subtotal';

const Checkout = () => {
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img 
                    className="checkout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/01/credit/img16/CCMP/newstorefront/YACC-desktop-nonprime-banner3.png"
                    alt="card-banner"    
                />
                <div>
                    <h2 className="checkout__title">Your Shopping Basket</h2>
 
                </div>    
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout

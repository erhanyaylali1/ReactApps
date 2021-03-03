import React from 'react';
import './styles/Checkout.css';
import Subtotal from './Subtotal';
import { useSelector } from 'react-redux';
import { getItems } from '../features/cardSlice';
import CardRow from './CardRow';
import { getUser } from '../features/userSlice';
import FlipMove from 'react-flip-move';


const Checkout = () => {

    const basket = useSelector(getItems);
    const user = useSelector(getUser)

    const renderCheckoutProducts = () => {
        return basket?.map((item) => {
            return (
                <div>
                    <CardRow
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        image={item.image}
                        rating={item.rating}
                    />
                </div>
            )
        })
    }

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img 
                    className="checkout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/01/credit/img16/CCMP/newstorefront/YACC-desktop-nonprime-banner3.png"
                    alt="card-banner"    
                />
                <div>
                    <h2 className="checkout__title">
                        <h4>Hello, {user?.name}</h4>
                        Your Shopping Basket
                    </h2>
                    <FlipMove leaveAnimation="elevator" >
                        {renderCheckoutProducts()}  
                    </FlipMove>
                </div>    
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
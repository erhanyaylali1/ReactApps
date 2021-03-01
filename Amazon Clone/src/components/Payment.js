import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getItems, getTotal } from '../features/cardSlice';
import { getUser } from '../features/userSlice';
import CardRow from './CardRow';
import './styles/Payment.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';

const Payment = () => {

    const user = useSelector(getUser);
    const basket = useSelector(getItems);

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment()
    }

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message:"");
    }
    
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout ({<Link to="/checkout">{basket?.length} Items</Link>})</h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>1267 Street</p>
                        <p>Menemen, İzmir</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket?.map((item)=> {return (
                             <CardRow
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                rating={item.rating}
                                payment
                            />
                        )})}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <h4>Card Details</h4>
                        <form onSubmit={handleSubmit}>
                            <CardElement 
                                onChange={handleChange}
                            />
                            <div className="payment__price">
                                <CurrencyFormat
                                    renderText={(val) => (
                                        <React.Fragment>
                                            <h5>Order Total: {val}</h5>
                                        </React.Fragment>
                                    )}
                                    decimalScale={2}
                                    value={useSelector(getTotal)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                            </div>
                            <button 
                                disabled={processing || disabled || succeeded }
                                type="submit"
                            >
                                <span>{processing ? 'Processing':'Buy Now'}</span>
                            </button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
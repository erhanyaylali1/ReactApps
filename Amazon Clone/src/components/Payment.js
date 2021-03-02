import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCard, getItems, getTotal } from '../features/cardSlice';
import { getUser } from '../features/userSlice';
import CardRow from './CardRow';
import './styles/Payment.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { withRouter } from 'react-router-dom';

const Payment = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const basket = useSelector(getItems);
    const price = useSelector(getTotal);
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {

        const getClientSecret = async () => {
            const url = "http://localhost:5001/ey1-f69b8/us-central1/api/payments/create?total=" + price * 100;
            await fetch(url)
            .then((res) => res.json())
            .then((rep) => setClientSecret(rep.clientSecret));
        }
        getClientSecret();
    },[basket])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(() => {
            setError(null);
            props.history.replace('/orders');
            dispatch(clearCard());
        })
    }

    const handleChange = (e) => {
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
                                    value={price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                            </div>
                            <button type="submit">
                                <span>Buy Now</span>
                            </button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Payment)
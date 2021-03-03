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
import { db } from '../FirebaseConfig';
import { message } from 'antd';
import 'antd/dist/antd.css';

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

        if(basket.length === 0) {
            props.history.replace('/');
        }

        const getClientSecret = async () => {
            const url = "http://localhost:5001/ey1-f69b8/us-central1/api/payments/create?total=" + Math.ceil((price * 100).toFixed(2));
            console.log(url);   
            await fetch(url)
            .then((res) => res.json())
            .then((rep) => setClientSecret(rep.clientSecret))
            .catch((err) => {
                message.error({ content: "Could Not Connected to Server", key: "updatable" , duration: 4 });
            })
        }
        getClientSecret();
    },[basket])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const key = "updatable";
        message.loading({ content: "Order is Receiving", key });
        await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            setError(null);
            db.collection('users').doc(user?.id)
            .collection('orders').doc(paymentIntent.id)
            .set({
                basket,
                amount: paymentIntent.amount / 100,
                created: paymentIntent.created
            });
            dispatch(clearCard());
            message.success({ content: "Order is Successfully Recieved", key , duration: 1.5 });
            setTimeout(() => {
                props.history.push('/orders');
            },500)
        }).catch((err) => {
            message.error({ content: "An Error Ocurred During the Payment", key: "updatable" , duration: 4 });
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
                                hideButton
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
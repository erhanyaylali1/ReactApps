import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const PaymentForm = ({ token, data, back, handleCheckout, next }) => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    const handleSubmit = async (e, elements, stripe) => {
        e.preventDefault();
        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
        if(error) {
            console.log(error);
        } else {
            const orderData = {
                line_items: token.live.line_items,
                customer: { 
                    firstname: data.firstName,
                    lastname: data.lastName,
                    email: data.email
                },
                shipping: {
                    name: 'Shipping',
                    street: data.address1,
                    town_city: data.city,
                    county_state: data.shippingSubdivision,
                    postal_zip_cde: data.zip,
                    country: data.shippingCountry
                },
                fulfillment: { shipping_method: data.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id : paymentMethod.id
                    }
                }
            };
            handleCheckout(token.id, orderData);
            next();
        }
    }
    return (
        <div style={{ padding: '15px' }}>
            <Review token={token} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0'}}>
                Payment Method
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br /> <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Button 
                                    variant="outlined"
                                    onClick={back}    
                                >
                                    Back
                                </Button>
                                <Button 
                                    disabled={!stripe} 
                                    color="primary" 
                                    variant="contained" 
                                    type="submit"
                                >
                                    Checkout
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </div>
    )
}

export default PaymentForm

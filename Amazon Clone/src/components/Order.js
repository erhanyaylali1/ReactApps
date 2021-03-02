import React from 'react';
import moment from 'moment';
import CardRow from './CardRow';
import CurrencyFormat from 'react-currency-format';
import './styles/Order.css';

const Order = ({order}) => {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format('MMMM Do YYYY, hh:mma')}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map((item) => (
                <CardRow 
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    rating={item.rating}
                    hideButton
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <React.Fragment>
                        <h5 className="order__total">Order Total: {value}</h5>
                    </React.Fragment>
                )}
                decimalScale={2}
                value={order.data.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    )
}

export default Order

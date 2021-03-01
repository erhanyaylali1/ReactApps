import React from 'react'
import CurrencyFormat from 'react-currency-format';
import './styles/Subtotal.css';
import { useSelector } from 'react-redux';
import { getItems, getTotal } from '../features/cardSlice';
import { getIsLogged } from '../features/userSlice';
import { withRouter } from 'react-router-dom';

const Subtotal = (props) => {

    const length = useSelector(getItems).length;
    const isLogged = useSelector(getIsLogged);
    const proceed = () => {
        if(!isLogged) {
            props.history.push('/login');
        } else {
            props.history.push('/payment');
        }
    }

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <React.Fragment>
                        <p>
                            Subtotal ({length} items):
                            <strong> {value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" />
                            This order contains a gift
                        </small>
                    </React.Fragment>
                )}
                decimalScale={2}
                value={useSelector(getTotal)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            
            <button onClick={proceed}>Proceed to Checkout</button>
            
        </div>
    )
}

export default withRouter(Subtotal)
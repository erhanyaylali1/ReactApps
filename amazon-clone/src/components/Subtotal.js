import React from 'react'
import CurrencyFormat from 'react-currency-format';
import './styles/Subtotal.css';

const Subtotal = () => {
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <React.Fragment>
                        <p>
                            Subtotal (0 items):
                            <strong> 0</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" />
                            This order contains a gift
                        </small>
                    </React.Fragment>
                )}
                decimalScale={2}
                value={0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal

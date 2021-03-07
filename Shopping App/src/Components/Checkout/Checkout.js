import React, { useEffect, useState } from 'react';
import useStyles from './style';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import AddressForm from './AddressForm/AddressForm';
import PaymentForm from './PaymentForm/PaymentForm';
import { commerce } from '../../lib/commerce';
import { Link, useHistory} from 'react-router-dom';

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart, order, error, handleCheckout }) => {
    
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [token, setToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const history = useHistory();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const response = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                setToken(response);
            } catch (error) {
                history.push('/');
            }
        }
        generateToken();
    },[cart.id]);

    const nextStep = () => setActiveStep(activeStep + 1);
    const backStep = () => setActiveStep(activeStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const Form = () => activeStep === 0 ? 
    <AddressForm token={token} next={next} /> : 
    <PaymentForm data={shippingData} token={token} back={backStep} next={next} handleCheckout={handleCheckout}/>

    let Confirmation = () => order.customer ? (
        <div style={{ padding: '20px' }}>
            <CssBaseline />
            <div>
                <Typography variant="h5">
                    Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">
                    Order ref: {order.customer_reference}
                </Typography>
            </div>
            <br />
            <Button 
                variant="outlined" 
                type="button"
                component={Link}
                to="/"
            >
                Back to Home
            </Button>
        </div>
    ):(
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if(error) {
        <React.Fragment>
            <Typography variant="h5">
                Error: {error}
            </Typography>
            <br />
            <Button 
                variant="outlined" 
                type="button"
                component={Link}
                to="/"
            >
                Back to Home
            </Button>
        </React.Fragment>
    }

    return (
        <React.Fragment>
            <div className={classes.toolbar} />
            <main className={classes.layout} >
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === steps.length ? <Confirmation /> : <Form /> }
                </Paper>
            </main>
        </React.Fragment>
    )
}

export default Checkout

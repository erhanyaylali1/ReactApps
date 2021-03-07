import React, { useEffect, useState } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import CustomTextField from './CustomTextField';
import { commerce } from '../../../lib/commerce';
import { Link } from 'react-router-dom';

const AddressForm = ({ token, next }) => {
    const methods = useForm();
    
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    useEffect(() => {
        if(token){
            fetchShippingCountries(token.id);
        }
    },[]);

    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    },[shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(token.id, shippingCountry, shippingSubdivision);
    },[shippingSubdivision])


    const fetchShippingCountries = async (tokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(tokenId);
        await setShippingCountries(countries);
        await setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(shippingSubdivisions)[0]);
    }

    const fetchShippingOptions = async (tokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(tokenId, { country, region });
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }   
    

    console.log(shippingCountry);
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom align="center">
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form 
                    style={{ marginLeft: '15px', marginRight: '15px' }}
                    onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}) )}
                >
                    <Grid container spacing={3}>
                        <CustomTextField name="firstName" label="First Name" />
                        <CustomTextField name="lastName" label="Last Name" />
                        <CustomTextField name="address1" label="Address" />
                        <CustomTextField name="email" label="Email" />
                        <CustomTextField name="city" label="City" />
                        <CustomTextField name="zip" label="Zip / Postal Code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select 
                                value={shippingCountry} 
                                fullWidth 
                                onChange={(e) => setShippingCountry(e.target.value)}
                            >
                                {Object.entries(shippingCountries).map(([code, name]) => (
                                    <MenuItem key={code} value={code}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>                        
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Province</InputLabel>
                            <Select 
                                value={shippingSubdivision} 
                                fullWidth 
                                onChange={(e) => setShippingSubdivision(e.target.value)}
                            >
                                {Object.entries(shippingSubdivisions).map(([code, name]) => (
                                    <MenuItem key={code} value={code}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select 
                                value={shippingOption} 
                                fullWidth 
                                onChange={(e) => setShippingOption(e.target.value)}
                            >
                                {shippingOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                       {`${option.description} - ${option.price.formatted_with_symbol}`}
                                    </MenuItem>
                                ))}
                            </Select> 
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to='/cart' variant="outlined" >
                            Back to Cart
                        </Button>
                        <Button variant="contained" type="submit">
                            Next
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </React.Fragment>
    )
}

export default AddressForm

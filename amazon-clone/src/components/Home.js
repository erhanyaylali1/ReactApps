import React from 'react';
import Product from './Product';
import './styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="home__container">
                <img 
                    src="https://capslocknext.com/wp-content/uploads/2020/05/amazon.jpg" 
                    alt="banner" 
                    className="home__image"
                /> 
                <div className="home__row">
                    <Product  
                        id={1}
                        title="The Lean Startup"
                        price={29.99}
                        image="https://i.dr.com.tr/cache/500x400-0/originals/0001848621002-1.jpg"
                        rating={4}
                    />
                    <Product 
                        id={2}
                        title="Spigen Rugged Armor Designed for Xiaomi Mi Note 10 Lite Case (2020) - Matte Black"
                        price={711.99}
                        image="https://images-na.ssl-images-amazon.com/images/I/81PtEw326aL._AC_SL1500_.jpg"
                        rating={5}
                    />
                </div>
                <div className="home__row">
                    <Product 
                        id={3}
                        title="RUNMUS Gaming Headset for PS4, Xbox One, PC Headset w/Surround Sound, Noise Canceling Over Ear Headphones with Mic & LED Light, Compatible with PS5, PS4, Xbox One, Switch, PC, PS2, Mac, Laptop"
                        price={59.99}
                        image="https://images-na.ssl-images-amazon.com/images/I/81ZQgWwuVzL._AC_SL1500_.jpg"
                        rating={5}
                    />
                    <Product 
                        id={4}
                        title="Logitech G602 Lag-Free Wireless Gaming Mouse – 11 Programmable Buttons, Upto 2500 DPI"
                        price={129.99}
                        image="https://i.dr.com.tr/cache/500x400-0/originals/0001848621002-1.jpg"
                        rating={2}
                    />
                    <Product 
                        id={5}
                        title="NUBWO Gaming headsets PS4 N7 Stereo Xbox one Headset Wired PC Gaming Headphones with Noise Canceling Mic , Over Ear Gaming Headphones for PC/MAC/PS4/PS5/Switch/Xbox one (Adapter Not Included)"
                        price={24.99}
                        image="https://images-na.ssl-images-amazon.com/images/I/61EIHYCUGYL._AC_SL1500_.jpg"
                        rating={3}
                    />
                </div>
                <div className="home__row">
                    <Product 
                        id={6}
                        title="amFilm Tempered Glass Screen Protector for Nintendo Switch 2017 (2-Pack)"
                        price={7.99}
                        image="https://images-na.ssl-images-amazon.com/images/I/61RS44SioLL._AC_SL1500_.jpg"
                        rating={5}
                    />
                </div>
            </div>    
        </div>
    )
}

export default Home
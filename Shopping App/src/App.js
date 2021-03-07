import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import Navbar from './Components/Navbar/Navbar';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Components/Checkout/Checkout';

function App() {
    const [ products, setProducts ] = useState([]);
    const [ cart, setCart ] = useState({});
    const [order,setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCart();
    },[])

    const fetchProducts = async () => {
        const response = await commerce.products.list();
        setProducts(response.data);
    };

    const fetchCart = async () => {
        const response = await commerce.cart.retrieve();
        setCart(response);
    };

    const handleAddToCart = async (id, quantity) => {
        const response = await commerce.cart.add(id, quantity);
        setCart(response.cart);
    };

    const handleUpdateCartQuantity = async (id, quantity) => {
        const response = await commerce.cart.update(id, { quantity });
        setCart(response.cart);
    };

    const handleRemoveFromCart = async (id) => {
        const response = await commerce.cart.remove(id);
        setCart(response.cart)
    };

    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();
        setCart(response.cart)
    };

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCheckout = async (token, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(token, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch(error) {
            setErrorMessage(error.data.error.message);
        }
    }

    return (
        <Router>
            <div className="App">
                <Navbar itemNumbers={cart.total_items} />
                <Switch>
                    <Route path="/" exact>    
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route path="/cart">
                        <Cart
                            cart={cart} 
                            updateCart={handleUpdateCartQuantity} 
                            deleteItem={handleRemoveFromCart}
                            emptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route path="/checkout">
                        <Checkout 
                            cart={cart} 
                            order={order}
                            error={errorMessage}
                            handleCheckout={handleCheckout}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
        
    );
}

export default App;

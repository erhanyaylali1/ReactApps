import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import Navbar from './Components/Navbar/Navbar';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';

function App() {
    const [ products, setProducts ] = useState([]);
    const [ cart, setCart ] = useState({});

    useEffect(() => {
        fetchProducts();
        fetchCart();
    },[])

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    };

    const fetchCart = async () => {
        const response = await commerce.cart.retrieve();
        setCart(response);
    };

    const handleAddToCart = async (id, quantity) => {
        const response = await commerce.cart.add(id, quantity);
        setCart(response.cart);
    };

    return (
        <div className="App">
            <Navbar itemNumbers={cart.total_items} />
            {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
            <Cart cart={cart} />
        </div>
    );
}

export default App;

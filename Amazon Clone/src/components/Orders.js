import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../features/userSlice';
import { db } from '../FirebaseConfig';
import Order from './Order';
import './styles/Orders.css'

const Orders = () => {

    const user= useSelector(getUser);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user) {
            db.collection('users')
            .doc(user?.id)
            .collection('orders')
            .orderBy('created','desc')
            .onSnapshot((snapshot) => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        } else {
            setOrders([]);
        }
        
    }, [user]);

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders__container">
                {orders?.map((order) => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders

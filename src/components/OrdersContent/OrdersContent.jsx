import React, {useEffect, useState} from 'react';
import './OrdersContent.css';

const OrdersContent = () => {
    const [orders, setOrders] = useState([]);
    const [lastOrder, setLastOrder] = useState(null);

    useEffect(() => {
        getUserOrders();
    }, []);

    const getUserOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('loggedInUser');
            const userId = user ? JSON.parse(user).userId : '-1';
            const response = await fetch(`http://localhost:8080/api/users/${userId}/orders`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.status === 200) {
                setOrders(data);
                setLastOrder(data.length > 0 ? data[0] : null);
            }
            else if (response.status === 403) {
                console.error('403 Forbidden fetching user orders');
            }
        } catch (error) {
            console.error('Error fetching user orders:', error);
        }
    };

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    function formatDate(datetimeString) {
        const date = new Date(datetimeString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    return (
        <div>
            <h2 className="order-title">My Orders</h2>
            <table className="order-table">
                <thead>
                <tr>
                    <th>Order #</th>
                    <th>Items</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
                <tr className="recent-order-divider">
                    <td colSpan="5">My Recent Order</td>
                </tr>
                </thead>
                <tbody>
                <tr className="recent-order">
                    <td>{lastOrder ? lastOrder.orderId : '-'}</td>
                    <td>{lastOrder ? lastOrder.productsCount : '-'}</td>
                    <td>{lastOrder ? formatDate(lastOrder.orderDate) : '-'}</td>
                    <td>{lastOrder ? `${lastOrder.price}\u20B4` : '-'}</td>
                    <td>{lastOrder ? capitalizeFirstLetter(lastOrder.status) : '-'}</td>
                </tr>
                <tr className="all-orders-divider">
                    <td colSpan="5">All Orders</td>
                </tr>
                {orders.map(order => (
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.productsCount}</td>
                        <td>{formatDate(order.orderDate)}</td>
                        <td>{`${order.price}\u20B4`}</td>
                        <td>{capitalizeFirstLetter(order.status)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersContent;

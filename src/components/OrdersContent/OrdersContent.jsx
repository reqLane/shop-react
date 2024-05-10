import React from 'react';
import './OrdersContent.css';

const OrdersContent = () => {
    const lastOrder = {
        id: 1234,
        items: 3,
        date: '10.05.24',
        sum: 150,
        status: 'Completed'
    };

    const allOrders = [
        {
            id: 1234,
            items: 3,
            date: '10.05.24',
            sum: 150,
            status: 'Completed'
        },
        {
            id: 1235,
            items: 2,
            date: '05.05.24',
            sum: 100,
            status: 'Cancelled'
        }
    ];

    return (
        <div>
            <h2 className="order-title">My Orders</h2>
            <table className="order-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Number of Items</th>
                    <th>Date</th>
                    <th>Sum</th>
                    <th>Status</th>
                </tr>
                <tr className="recent-order-divider">
                    <td colSpan="5">My Recent Order</td>
                </tr>
                </thead>
                <tbody>
                <tr className="recent-order">
                    <td>{lastOrder.id}</td>
                    <td>{lastOrder.items}</td>
                    <td>{lastOrder.date}</td>
                    <td>{lastOrder.sum}</td>
                    <td>{lastOrder.status}</td>
                </tr>
                <tr className="all-orders-divider">
                    <td colSpan="5">All Orders</td>
                </tr>
                {allOrders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.items}</td>
                        <td>{order.date}</td>
                        <td>{order.sum}</td>
                        <td>{order.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersContent;

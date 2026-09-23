import React, { useState, useEffect } from 'react';
import axios from "../axios.config";
import Nav from '../components/nav';
import { useSelector } from 'react-redux';
import {
    AiOutlineShoppingCart,
    AiOutlineEnvironment,
    AiOutlineUnorderedList,
    AiOutlineClose,
    AiOutlineCheck,
} from 'react-icons/ai';

const MyOrdersPage = () => {
    const userEmail = useSelector((state) => state.user.email);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchOrders = async () => {
        if (!userEmail) {
            setError("Please login to view your orders.");
            setOrders([]);
            return;
        }
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('/api/v2/orders/myorders', {
                params: { email: userEmail },
            });
            setOrders(response.data.orders);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching orders');
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (orderId) => {
        if (!window.confirm('Cancel this order? This action cannot be undone.')) return;
        try {
            const response = await axios.patch(`/api/v2/orders/cancel-order/${orderId}`);
            setOrders((prev) =>
                prev.map((order) =>
                    order._id === orderId ? { ...order, orderStatus: response.data.order.status } : order
                )
            );
            fetchOrders();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error cancelling order');
        }
    };

    useEffect(() => { fetchOrders(); }, [userEmail]);

    return (
        <div className="page-container">
            <Nav />
            <div className="content-wrapper animate-page" style={{ maxWidth: '860px' }}>
                <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>My Orders</h1>

                {/* Loading skeleton */}
                {loading && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div className="skeleton" style={{ height: '14px', width: '40%' }} />
                                    <div className="skeleton" style={{ height: '14px', width: '15%' }} />
                                </div>
                                <div className="skeleton" style={{ height: '12px', width: '60%', marginBottom: '0.5rem' }} />
                                <div className="skeleton" style={{ height: '12px', width: '40%' }} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="empty-state" style={{ minHeight: '40vh' }}>
                        <AiOutlineUnorderedList className="empty-state-icon" size={56} />
                        <h2 className="empty-state-title">Couldn&apos;t load orders</h2>
                        <p className="empty-state-subtitle">{error}</p>
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && orders.length === 0 && (
                    <div className="empty-state" style={{ minHeight: '50vh' }}>
                        <AiOutlineShoppingCart className="empty-state-icon" size={60} />
                        <h2 className="empty-state-title">No Orders Yet</h2>
                        <p className="empty-state-subtitle">You haven&apos;t placed any orders. Start shopping!</p>
                    </div>
                )}

                {/* Orders List */}
                {!loading && !error && orders.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {orders.map((order, i) => {
                            const isCancelled = order.orderStatus === 'Cancelled';
                            return (
                                <div
                                    key={order._id}
                                    className={`card card-delay-${Math.min(i + 1, 5)}`}
                                    style={{ padding: '1.5rem', animation: 'fadeInUp 0.35s ease both' }}
                                >
                                    {/* Order Header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.875rem', marginBottom: '1rem' }}>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                Order ID
                                            </p>
                                            <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'monospace', marginTop: '0.15rem' }}>
                                                {order._id}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                                                ${order.totalAmount}
                                            </span>
                                            {isCancelled ? (
                                                <span className="badge badge-danger">
                                                    <AiOutlineClose size={10} style={{ marginRight: '3px' }} />
                                                    Cancelled
                                                </span>
                                            ) : (
                                                <span className="badge badge-success">
                                                    <AiOutlineCheck size={10} style={{ marginRight: '3px' }} />
                                                    {order.orderStatus || 'Active'}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                        {/* Shipping Address */}
                                        <div style={{ flex: '1 1 200px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                                                <AiOutlineEnvironment size={14} color="var(--color-primary)" />
                                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>Shipping Address</span>
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                                <p style={{ margin: 0 }}>
                                                    {order.shippingAddress.address1}
                                                    {order.shippingAddress.address2 && `, ${order.shippingAddress.address2}`}
                                                </p>
                                                <p style={{ margin: 0 }}>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                                                <p style={{ margin: 0 }}>{order.shippingAddress.country}</p>
                                                {order.shippingAddress.addressType && (
                                                    <span className="badge badge-neutral" style={{ marginTop: '0.25rem' }}>{order.shippingAddress.addressType}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Items */}
                                        <div style={{ flex: '1 1 200px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                                                <AiOutlineUnorderedList size={14} color="var(--color-primary)" />
                                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>Items</span>
                                            </div>
                                            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                                                {order.orderItems.map((item, idx) => (
                                                    <li key={idx} style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                                                        <span style={{ fontWeight: 500 }}>{item.name} <span style={{ color: 'var(--color-text-muted)' }}>×{item.quantity}</span></span>
                                                        <span style={{ fontWeight: 600 }}>${item.price}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Cancel Button */}
                                    {!isCancelled && (
                                        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                                            <button
                                                onClick={() => cancelOrder(order._id)}
                                                className="btn btn-danger btn-sm"
                                                aria-label={`Cancel order ${order._id}`}
                                            >
                                                <AiOutlineClose size={13} />
                                                Cancel Order
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;

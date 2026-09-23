import React, { useState, useEffect } from 'react';
import axios from "../axios.config";
import Nav from '../components/nav';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
    AiOutlineEnvironment,
    AiOutlineCreditCard,
    AiOutlineDollar,
    AiOutlineShoppingCart,
    AiOutlineArrowRight
} from 'react-icons/ai';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addressId, email } = location.state || {};

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cod');

    useEffect(() => {
        if (!addressId || !email) {
            navigate('/SelectAddress');
            return;
        }
        const fetchData = async () => {
            try {
                const addressResponse = await axios.get('/api/v2/user/addresses', { params: { email } });
                const address = addressResponse.data.addresses.find((addr) => addr._id === addressId);
                if (!address) throw new Error('Selected address not found.');
                setSelectedAddress(address);

                const cartResponse = await axios.get('/api/v2/product/cartproducts', { params: { email } });
                const processedCartItems = cartResponse.data.cart.map((item) => ({
                    _id: item.productId._id,
                    name: item.productId.name,
                    price: item.productId.price,
                    images: item.productId.images.map((imagePath) => `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${imagePath}`),
                    quantity: item.quantity,
                }));
                setCartItems(processedCartItems);

                const total = processedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
                setTotalPrice(total);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [addressId, email, navigate]);

    const handlePlaceOrder = async (paymentType = 'cod', paypalOrderData = null) => {
        try {
            const orderItems = cartItems.map((item) => ({
                product: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.images && item.images.length > 0 ? item.images[0] : '/default-avatar.png',
            }));

            const payload = {
                email,
                shippingAddress: selectedAddress,
                orderItems,
                paymentMethod: paymentType,
                paypalOrderData,
            };

            await axios.post('/api/v2/orders/place-order', payload);
            navigate('/myorders');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className='page-container'>
            <Nav />
            <div className='content-wrapper animate-page' style={{ maxWidth: '1000px' }}>
                <h1 className="section-title" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    Checkout
                </h1>

                {loading && (
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="skeleton card" style={{ height: '200px' }} />
                            <div className="skeleton card" style={{ height: '200px' }} />
                        </div>
                        <div className="skeleton card" style={{ flex: '1 1 300px', height: '300px' }} />
                    </div>
                )}

                {!loading && error && (
                    <div className="empty-state card">
                        <h2 className="empty-state-title text-danger">Error Loading Checkout</h2>
                        <p className="empty-state-subtitle">{error}</p>
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry</button>
                    </div>
                )}

                {!loading && !error && (
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

                        {/* Left Column (Address & Items) */}
                        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>

                            {/* Selected Address Card */}
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <AiOutlineEnvironment size={20} color="var(--color-primary)" />
                                    Shipping Address
                                </h2>
                                {selectedAddress ? (
                                    <div style={{ backgroundColor: 'var(--color-surface-alt)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 600 }}>{selectedAddress.addressType || 'Address'}</span>
                                            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/SelectAddress')}>Change</button>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                            {selectedAddress.address1} {selectedAddress.address2 && `, ${selectedAddress.address2}`}
                                            <br />
                                            {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
                                            <br />
                                            {selectedAddress.country}
                                        </p>
                                    </div>
                                ) : (
                                    <p>No address selected.</p>
                                )}
                            </div>

                            {/* Cart Items Card */}
                            <div className="card" style={{ padding: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <AiOutlineShoppingCart size={20} color="var(--color-primary)" />
                                    Cart Items
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {cartItems.map((item) => (
                                        <div key={item._id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
                                            <div style={{ width: '64px', height: '64px', borderRadius: '8px', backgroundColor: 'var(--color-surface-alt)', overflow: 'hidden', flexShrink: 0 }}>
                                                <img
                                                    src={item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/64'}
                                                    alt={item.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: '0 0 0.25rem' }}>{item.name}</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                                                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Right Column (Payment & Summary) */}
                        <div style={{ flex: '1 1 300px', minWidth: '300px' }}>
                            <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '80px' }}>

                                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <AiOutlineCreditCard size={20} color="var(--color-primary)" />
                                    Payment Method
                                </h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '1rem',
                                            border: `1.5px solid ${paymentMethod === 'cod' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                            borderRadius: 'var(--radius-sm)',
                                            cursor: 'pointer',
                                            backgroundColor: paymentMethod === 'cod' ? 'var(--color-primary-light)' : 'transparent',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <input
                                            type='radio'
                                            name='paymentMethod'
                                            value='cod'
                                            checked={paymentMethod === 'cod'}
                                            onChange={() => setPaymentMethod('cod')}
                                            style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }}
                                        />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <AiOutlineDollar size={20} color="var(--color-text-secondary)" />
                                            <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>Cash on Delivery</span>
                                        </div>
                                    </label>

                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '1rem',
                                            border: `1.5px solid ${paymentMethod === 'paypal' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                            borderRadius: 'var(--radius-sm)',
                                            cursor: 'pointer',
                                            backgroundColor: paymentMethod === 'paypal' ? 'var(--color-primary-light)' : 'transparent',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <input
                                            type='radio'
                                            name='paymentMethod'
                                            value='paypal'
                                            checked={paymentMethod === 'paypal'}
                                            onChange={() => setPaymentMethod('paypal')}
                                            style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }}
                                        />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <AiOutlineCreditCard size={20} color="var(--color-text-secondary)" />
                                            <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>Pay Online (PayPal)</span>
                                        </div>
                                    </label>
                                </div>

                                <div style={{ backgroundColor: 'var(--color-surface-alt)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
                                        <span style={{ fontWeight: 600 }}>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Shipping</span>
                                        <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>Free</span>
                                    </div>
                                    <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '0.75rem 0' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 700 }}>Total</span>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                {paymentMethod === 'cod' ? (
                                    <button
                                        onClick={() => handlePlaceOrder('cod', null)}
                                        className='btn btn-primary btn-full btn-lg'
                                        style={{ borderRadius: '10px' }}
                                    >
                                        Confirm Order
                                        <AiOutlineArrowRight size={16} />
                                    </button>
                                ) : (
                                    <div style={{ minHeight: '150px' }}>
                                        <PayPalScriptProvider options={{ 'client-id': 'AQ9AHGwnIUKME-jEniPL_r7jo6aa_I1ZYokMaHbvPyPiUJMUM1dXo1I7CUFlpVrG6C8e6M3Nyase7Pwd' }}>
                                            <PayPalButtons
                                                style={{ layout: 'vertical', shape: 'rect' }}
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [{ amount: { value: totalPrice.toFixed(2) } }],
                                                    });
                                                }}
                                                onApprove={async (data, actions) => {
                                                    const order = await actions.order.capture();
                                                    handlePlaceOrder('paypal', order);
                                                }}
                                                onError={(err) => console.error('PayPal checkout error:', err)}
                                            />
                                        </PayPalScriptProvider>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderConfirmation;

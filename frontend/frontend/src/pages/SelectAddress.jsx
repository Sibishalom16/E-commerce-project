import React, { useState, useEffect } from 'react';
import axios from "../axios.config";
import Nav from '../components/nav';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineEnvironment, AiOutlineCheckCircle, AiOutlinePlus } from 'react-icons/ai';

const SelectAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userEmail = useSelector((state) => state.user.email);

    useEffect(() => {
        if (!userEmail) {
            navigate('/login');
            return;
        }
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('/api/v2/user/addresses', {
                    params: { email: userEmail },
                });
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = response.data;
                if (data && Array.isArray(data.addresses)) {
                    setAddresses(data.addresses);
                } else {
                    setAddresses([]);
                }
            } catch (err) {
                console.error('Error fetching addresses:', err);
                setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchAddresses();
    }, [userEmail, navigate]);

    const handleSelectAddress = (addressId) => {
        navigate('/order-confirmation', { state: { addressId, email: userEmail } });
    };

    return (
        <div className='page-container'>
            <Nav />
            <div className='content-wrapper animate-page' style={{ maxWidth: '800px' }}>
                <h1 className="section-title" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    Select Delivery Address
                </h1>

                {loading && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[1, 2].map(i => (
                            <div key={i} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div className="skeleton" style={{ height: '14px', width: '60%' }} />
                                    <div className="skeleton" style={{ height: '12px', width: '40%' }} />
                                    <div className="skeleton" style={{ height: '12px', width: '30%' }} />
                                </div>
                                <div className="skeleton" style={{ height: '36px', width: '100px', borderRadius: '8px' }} />
                            </div>
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <div className="empty-state">
                        <h2 className="empty-state-title text-danger">Error Loading Addresses</h2>
                        <p className="empty-state-subtitle">{error}</p>
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry</button>
                    </div>
                )}

                {!loading && !error && addresses.length === 0 && (
                    <div className="empty-state card">
                        <AiOutlineEnvironment className="empty-state-icon" size={56} />
                        <h2 className="empty-state-title">No addresses available</h2>
                        <p className="empty-state-subtitle">Please add a shipping address to proceed with your order.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/createAddress')}>
                            <AiOutlinePlus size={16} />
                            Add New Address
                        </button>
                    </div>
                )}

                {!loading && !error && addresses.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {addresses.map((address) => (
                            <div
                                key={address._id}
                                className="card"
                                style={{
                                    padding: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '1rem',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleSelectAddress(address._id)}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-light)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                            >
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <AiOutlineEnvironment size={20} color="var(--color-primary)" />
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                                {address.addressType || 'Saved Address'}
                                            </span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                            {address.address1}{address.address2 ? `, ${address.address2}` : ''}
                                            <br />
                                            {address.city}, {address.state} {address.zipCode}
                                            <br />
                                            {address.country}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => { e.stopPropagation(); handleSelectAddress(address._id); }}
                                >
                                    <AiOutlineCheckCircle size={16} />
                                    Deliver Here
                                </button>
                            </div>
                        ))}

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                            <button className="btn btn-outline" onClick={() => navigate('/createAddress')}>
                                <AiOutlinePlus size={16} />
                                Add Another Address
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectAddress;

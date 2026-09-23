import React, { useEffect, useState } from "react";
import AddressCard from "../components/AdressCard";
import Nav from "../components/nav";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "../axios.config";
import {
    AiOutlineUser,
    AiOutlineMail,
    AiOutlinePlus,
    AiOutlineEnvironment,
} from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Profile() {
    const userEmail = useSelector((state) => state.user.email);
    const [personalDetails, setPersonalDetails] = useState({ name: "", email: "", avatarUrl: "" });
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userEmail) { setLoading(false); return; }
        axios.get(`/api/v2/user/profile?email=${userEmail}`, { headers: { "Content-Type": "application/json" } })
            .then((res) => {
                setPersonalDetails(res.data?.user || {});
                setAddresses(res.data?.addresses || []);
            })
            .catch((err) => console.log("Fetch error:", err))
            .finally(() => setLoading(false));
    }, [userEmail]);

    const handleAddAddress = () => navigate("/createAddress");

    if (!userEmail) {
        return (
            <div className="page-container">
                <Nav />
                <div className="empty-state" style={{ minHeight: '60vh' }}>
                    <AiOutlineUser className="empty-state-icon" size={60} />
                    <h2 className="empty-state-title">Not logged in</h2>
                    <p className="empty-state-subtitle">Please sign in to view your profile.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/login')}>Sign In</button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <Nav />
            <div className="content-wrapper animate-page" style={{ maxWidth: '900px' }}>

                {/* Personal Details Card */}
                <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AiOutlineUser size={20} color="var(--color-primary)" />
                        Personal Details
                    </h2>

                    {loading ? (
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            <div className="skeleton" style={{ width: '96px', height: '96px', borderRadius: '50%', flexShrink: 0 }} />
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '200px' }}>
                                {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: '16px', width: '60%' }} />)}
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            {/* Avatar */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                                <div
                                    style={{
                                        width: '96px',
                                        height: '96px',
                                        borderRadius: '50%',
                                        border: '3px solid var(--color-primary-light)',
                                        overflow: 'hidden',
                                        backgroundColor: 'var(--color-surface-alt)',
                                    }}
                                >
                                    {personalDetails.avatarUrl ? (
                                        <img
                                            src={`${API_BASE}/${personalDetails.avatarUrl}`}
                                            alt={personalDetails.name || 'Profile'}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <RxAvatar size={60} color="var(--color-text-muted)" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '200px' }}>
                                {/* Name */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                                        <AiOutlineUser size={13} color="var(--color-text-muted)" />
                                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                                        {personalDetails.name || <span style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Not provided</span>}
                                    </p>
                                </div>

                                {/* Email */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                                        <AiOutlineMail size={13} color="var(--color-text-muted)" />
                                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', wordBreak: 'break-all' }}>
                                        {personalDetails.email || userEmail}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Addresses Card */}
                <div className="card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AiOutlineEnvironment size={20} color="var(--color-primary)" />
                            Addresses
                        </h2>
                        <button className="btn btn-primary" onClick={handleAddAddress}>
                            <AiOutlinePlus size={15} />
                            Add Address
                        </button>
                    </div>

                    {loading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[1, 2].map(i => <div key={i} className="skeleton" style={{ height: '90px', borderRadius: 'var(--radius-md)' }} />)}
                        </div>
                    ) : addresses.length === 0 ? (
                        <div className="empty-state" style={{ padding: '2.5rem 1rem' }}>
                            <AiOutlineEnvironment className="empty-state-icon" size={44} />
                            <h3 className="empty-state-title" style={{ fontSize: '1rem' }}>No addresses saved</h3>
                            <p className="empty-state-subtitle" style={{ fontSize: '0.85rem' }}>Add a shipping address to check out faster.</p>
                            <button className="btn btn-primary btn-sm" onClick={handleAddAddress}>
                                <AiOutlinePlus size={14} />
                                Add Address
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {addresses.map((address, index) => (
                                <AddressCard key={index} {...address} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

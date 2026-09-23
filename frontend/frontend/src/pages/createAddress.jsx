import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/nav";
import { useSelector } from 'react-redux';
import axios from '../axios.config';
import { AiOutlineEnvironment, AiOutlineHome, AiOutlineGlobal, AiOutlineInsertRowRight } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import { BiHash } from "react-icons/bi";

const CreateAddress = () => {
    const navigate = useNavigate();
    const userEmail = useSelector((state) => state.user.email);

    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [addressType, setAddressType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const addressData = {
            country,
            city,
            address1,
            address2,
            zipCode,
            addressType,
            email: userEmail
        };

        try {
            const response = await axios.post("/api/v2/user/add-address", addressData, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status === 201) {
                navigate("/profile");
            }
        } catch (err) {
            console.error("Error adding address:", err);
            alert("Failed to add address. Please check the data and try again.");
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <Nav />
            <div className="auth-page" style={{ alignItems: 'flex-start', paddingTop: '2.5rem' }}>
                <div className="auth-card" style={{ maxWidth: '600px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', justifyContent: 'center' }}>
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                backgroundColor: 'var(--color-primary-light)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <AiOutlineEnvironment size={24} color="var(--color-primary)" />
                        </div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
                            Add a new address
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                        {/* Grid for two-column layout on larger screens */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                            {/* Country */}
                            <div>
                                <label className="input-label">Country</label>
                                <div style={{ position: 'relative' }}>
                                    <AiOutlineGlobal size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="input-field"
                                        placeholder="e.g. United States"
                                        style={{ paddingLeft: '2.25rem' }}
                                        required
                                    />
                                </div>
                            </div>

                            {/* City */}
                            <div>
                                <label className="input-label">City</label>
                                <div style={{ position: 'relative' }}>
                                    <FaCity size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="input-field"
                                        placeholder="e.g. New York"
                                        style={{ paddingLeft: '2.25rem' }}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address 1 */}
                        <div>
                            <label className="input-label">Address Line 1</label>
                            <div style={{ position: 'relative' }}>
                                <AiOutlineHome size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    value={address1}
                                    onChange={(e) => setAddress1(e.target.value)}
                                    className="input-field"
                                    placeholder="Street address, P.O. box, company name, c/o"
                                    style={{ paddingLeft: '2.25rem' }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Address 2 */}
                        <div>
                            <label className="input-label">Address Line 2 <span style={{ color: 'var(--color-text-muted)', fontWeight: 400, textTransform: 'none' }}>(Optional)</span></label>
                            <div style={{ position: 'relative' }}>
                                <AiOutlineInsertRowRight size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    value={address2}
                                    onChange={(e) => setAddress2(e.target.value)}
                                    className="input-field"
                                    placeholder="Apartment, suite, unit, building, floor, etc."
                                    style={{ paddingLeft: '2.25rem' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                            {/* Zip Code */}
                            <div>
                                <label className="input-label">Postal / Zip Code</label>
                                <div style={{ position: 'relative' }}>
                                    <BiHash size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                    <input
                                        type="number"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        className="input-field"
                                        placeholder="e.g. 10001"
                                        style={{ paddingLeft: '2.25rem' }}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Address Type */}
                            <div>
                                <label className="input-label">Address Type</label>
                                <div style={{ position: 'relative' }}>
                                    <AiOutlineEnvironment size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                    <select
                                        value={addressType}
                                        onChange={(e) => setAddressType(e.target.value)}
                                        className="input-field"
                                        style={{ paddingLeft: '2.25rem', appearance: 'none' }}
                                        required
                                    >
                                        <option value="" disabled>Select type...</option>
                                        <option value="Home">Home (7 AM - 9 PM delivery)</option>
                                        <option value="Office">Office (9 AM - 6 PM delivery)</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            disabled={loading}
                            style={{ marginTop: '1rem', borderRadius: '10px' }}
                        >
                            {loading ? 'Saving...' : 'Save Address'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAddress;
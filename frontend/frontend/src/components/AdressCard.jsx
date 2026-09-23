/* eslint-disable react/prop-types */
import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';

export default function AddressCard({
    _id,
    country,
    city,
    address1,
    address2,
    zipCode,
    addressType,
}) {
    return (
        <div
            className="card animate-fadeInUp"
            style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--color-primary-light)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <AiOutlineHome size={16} color="var(--color-primary)" />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                        {addressType || 'Address'}
                    </span>
                </div>
                {addressType && (
                    <span className="badge badge-neutral">{addressType}</span>
                )}
            </div>

            {/* Address details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {address1}{address2 ? `, ${address2}` : ''}
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    {city}, {zipCode}
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    {country}
                </p>
            </div>
        </div>
    );
}
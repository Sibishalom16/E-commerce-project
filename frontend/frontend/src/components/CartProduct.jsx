/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "../axios.config";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function CartProduct({ _id, name, images, quantity, price, stock, onQuantityChange }) {
    const [quantityVal, setQuantityVal] = useState(quantity);
    const userEmail = useSelector((state) => state.user.email);

    const handleIncrement = () => {
        let newQty = quantityVal + 1;
        if (stock !== undefined && newQty > stock) {
            newQty = stock;
        }
        setQuantityVal(newQty);
        updateQuantity(newQty);
    };

    const handleDecrement = () => {
        const newQty = quantityVal > 1 ? quantityVal - 1 : 1;
        setQuantityVal(newQty);
        updateQuantity(newQty);
    };

    const updateQuantity = (qty) => {
        if (onQuantityChange) onQuantityChange(qty);
        axios.put('/api/v2/product/cartproduct/quantity', {
            email: userEmail,
            productId: _id,
            quantity: qty,
        }).catch((err) => {
            console.error('Error updating quantity:', err);
        });
    };

    const currentImage = images && images.length > 0 ? images[0] : null;
    const itemTotal = (price * quantityVal).toFixed(2);

    return (
        <div
            className="card animate-fadeInUp"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                marginBottom: '0.75rem',
            }}
        >
            {/* Product Image */}
            <div
                style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    backgroundColor: 'var(--color-surface-alt)',
                    border: '1px solid var(--color-border)',
                }}
            >
                {currentImage ? (
                    <img
                        src={`${API_BASE}${currentImage}`}
                        alt={name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/80x80/f1f5f9/94a3b8?text=?';
                        }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '0.65rem' }}>
                        No img
                    </div>
                )}
            </div>

            {/* Name + Price */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {name}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '0.2rem 0 0' }}>
                    ${Number(price).toFixed(2)} each
                </p>
            </div>

            {/* Quantity Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
                <button
                    className="qty-btn"
                    onClick={handleDecrement}
                    aria-label="Decrease quantity"
                >
                    <AiOutlineMinus size={14} />
                </button>
                <span className="qty-display">{quantityVal}</span>
                <button
                    className="qty-btn"
                    onClick={handleIncrement}
                    aria-label="Increase quantity"
                    disabled={stock !== undefined && quantityVal >= stock}
                >
                    <AiOutlinePlus size={14} />
                </button>
            </div>

            {/* Item Total */}
            <div style={{ minWidth: '70px', textAlign: 'right', flexShrink: 0 }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-primary)' }}>
                    ${itemTotal}
                </span>
            </div>
        </div>
    );
}
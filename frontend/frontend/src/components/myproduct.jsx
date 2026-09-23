/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import axios from "../axios.config";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function MyProductCard({ _id, name, images, description, price, stock, category }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!images || images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    const currentImage = images && images.length > 0 ? images[currentIndex] : null;
    const isInStock = stock === undefined || stock > 0;

    const handleDelete = async () => {
        if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
        setDeleting(true);
        try {
            await axios.delete(`/api/v2/product/delete-product/${_id}`);
            window.location.reload();
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Failed to delete product. Please try again.");
            setDeleting(false);
        }
    };

    return (
        <div className="card-product animate-fadeInUp" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', backgroundColor: 'var(--color-surface-alt)' }}>
                {currentImage ? (
                    <img
                        src={`${API_BASE}${currentImage}`}
                        alt={name}
                        className="product-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/400x300/f1f5f9/94a3b8?text=No+Image';
                        }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', flexDirection: 'column', gap: '0.5rem' }}>
                        <AiOutlineShoppingCart size={36} />
                        <span style={{ fontSize: '0.75rem' }}>No Image</span>
                    </div>
                )}

                {category && (
                    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                        <span className="badge badge-primary">{category}</span>
                    </div>
                )}

                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <span className={`badge ${isInStock ? 'badge-success' : 'badge-danger'}`}>
                        {isInStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {name}
                </h3>

                {description && (
                    <p style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-text-muted)',
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}>
                        {description}
                    </p>
                )}

                {/* Price + Stock row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
                        ${Number(price).toFixed(2)}
                    </span>
                    {stock !== undefined && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                            Qty: {stock}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button
                        className="btn btn-outline"
                        onClick={() => navigate(`/edit-product/${_id}`)}
                        style={{ flex: 1, borderRadius: '10px' }}
                        aria-label={`Edit ${name}`}
                    >
                        <AiOutlineEdit size={15} />
                        Edit
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={handleDelete}
                        disabled={deleting}
                        style={{ flex: 1, borderRadius: '10px' }}
                        aria-label={`Delete ${name}`}
                    >
                        <AiOutlineDelete size={15} />
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}
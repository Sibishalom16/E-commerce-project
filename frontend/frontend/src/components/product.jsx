/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Product({ _id, name, images, description, price, category, stock }) {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  return (
    <div className="card-product animate-fadeInUp" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Image container */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '4/3',
          backgroundColor: 'var(--color-surface-alt)',
        }}
      >
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
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '0.5rem',
              color: 'var(--color-text-muted)',
            }}
          >
            <AiOutlineShoppingCart size={36} />
            <span style={{ fontSize: '0.75rem' }}>No Image</span>
          </div>
        )}

        {/* Category badge */}
        {category && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
            }}
          >
            <span className="badge badge-primary">{category}</span>
          </div>
        )}

        {/* Out of stock badge */}
        {!isInStock && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
          >
            <span className="badge badge-danger">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3
          style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: 0,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {name}
        </h3>

        {description && (
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              margin: 0,
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </p>
        )}

        <div style={{ marginTop: 'auto', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: 'var(--color-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            ${Number(price).toFixed(2)}
          </span>
          {stock !== undefined && (
            <span style={{ fontSize: '0.72rem', color: isInStock ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 600 }}>
              {isInStock ? `${stock} in stock` : 'Out of stock'}
            </span>
          )}
        </div>

        <button
          className="btn btn-primary btn-full"
          onClick={() => navigate(`/product/${_id}`)}
          style={{ marginTop: '0.5rem', borderRadius: '10px' }}
          aria-label={`View details for ${name}`}
        >
          <AiOutlineEye size={15} />
          View Details
        </button>
      </div>
    </div>
  );
}
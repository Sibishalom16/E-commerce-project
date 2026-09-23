import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios.config";
import Nav from "../components/nav";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineShoppingCart, AiOutlineTag, AiOutlineCheckCircle } from "react-icons/ai";
import { useSelector } from 'react-redux';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function ProductDetails() {
    const userEmail = useSelector((state) => state.user.email);
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [addedSuccess, setAddedSuccess] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/v2/product/product/${id}`);
                setProduct(response.data.product);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError(err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleIncrement = () => setQuantity((prev) => (product.stock && prev >= product.stock ? product.stock : prev + 1));
    const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const addtocart = async () => {
        if (!userEmail) {
            alert("Please login to add items to your cart.");
            navigate("/login");
            return;
        }
        setAddingToCart(true);
        try {
            await axios.post("/api/v2/product/cart", {
                userId: userEmail,
                productId: id,
                quantity: quantity,
            });
            setAddedSuccess(true);
            setTimeout(() => setAddedSuccess(false), 3000);
        } catch (err) {
            console.error("Error adding to cart:", err);
            alert("Failed to add to cart");
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="page-container">
                <Nav />
                <div className="content-wrapper" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div className="skeleton" style={{ flex: '1 1 400px', height: '400px', borderRadius: 'var(--radius-xl)' }} />
                    <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="skeleton" style={{ height: '40px', width: '80%' }} />
                        <div className="skeleton" style={{ height: '24px', width: '40%' }} />
                        <div className="skeleton" style={{ height: '100px', width: '100%' }} />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="page-container">
                <Nav />
                <div className="empty-state" style={{ minHeight: '60vh' }}>
                    <AiOutlineShoppingCart className="empty-state-icon" size={64} />
                    <h2 className="empty-state-title">Product not found</h2>
                    <p className="empty-state-subtitle">{error?.message || "This product may have been removed."}</p>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </div>
        );
    }

    const inStock = product.stock === undefined || product.stock > 0;

    return (
        <div className="page-container">
            <Nav />
            <div className="content-wrapper animate-page">
                <div className="card" style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '3rem', border: 'none', boxShadow: 'var(--shadow-lg)', borderRadius: 'var(--radius-xl)' }}>

                    {/* Image Gallery (Simplified to main image for now) */}
                    <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div
                            style={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                backgroundColor: 'var(--color-surface-alt)',
                                border: '1px solid var(--color-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={`${API_BASE}${product.images[0]}`}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            ) : (
                                <span className="text-muted">No Image Available</span>
                            )}
                        </div>
                        {/* Gallery thumbnails could go here */}
                    </div>

                    {/* Product Info */}
                    <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
                        {product.category && (
                            <span className="badge badge-primary" style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}>
                                {product.category}
                            </span>
                        )}

                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 0.5rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                            {product.name}
                        </h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                                ${Number(product.price).toFixed(2)}
                            </span>
                            <span className={`badge ${inStock ? 'badge-success' : 'badge-danger'}`} style={{ padding: '0.4rem 0.8rem' }}>
                                {inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                                Description
                            </h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                {product.description}
                            </p>
                        </div>

                        {product.tags && product.tags.length > 0 && (
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                    Tags
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {product.tags.map((tag, index) => (
                                        <span key={index} className="badge badge-neutral" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <AiOutlineTag size={12} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end' }}>

                            {/* Quantity */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                                    Quantity
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <button className="qty-btn" onClick={handleDecrement} disabled={quantity <= 1}>
                                        <AiOutlineMinus size={14} />
                                    </button>
                                    <span className="qty-display" style={{ width: '48px', height: '36px', fontSize: '1rem' }}>
                                        {quantity}
                                    </span>
                                    <button className="qty-btn" onClick={handleIncrement} disabled={product.stock && quantity >= product.stock}>
                                        <AiOutlinePlus size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Action */}
                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <button
                                    className={`btn ${addedSuccess ? 'btn-success' : 'btn-primary'} btn-full btn-lg`}
                                    onClick={addtocart}
                                    disabled={addingToCart || addedSuccess || !inStock}
                                    style={{
                                        height: '48px',
                                        borderRadius: '12px',
                                        backgroundColor: addedSuccess ? 'var(--color-success)' : undefined
                                    }}
                                >
                                    {addingToCart ? (
                                        <span style={{ width: '18px', height: '18px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.75s linear infinite' }} />
                                    ) : addedSuccess ? (
                                        <>
                                            <AiOutlineCheckCircle size={20} /> Added to Cart!
                                        </>
                                    ) : (
                                        <>
                                            <AiOutlineShoppingCart size={20} /> Add to Cart
                                        </>
                                    )}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

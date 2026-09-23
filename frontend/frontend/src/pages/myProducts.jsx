import React, { useEffect, useState } from "react";
import MyProductCard from "../components/myproduct";
import { useSelector } from 'react-redux';
import Nav from "../components/nav";
import axios from "../axios.config";
import { useNavigate } from "react-router-dom";
import { AiOutlineAppstore, AiOutlinePlus, AiOutlineReload } from "react-icons/ai";

export default function MyProducts() {
    const userEmail = useSelector((state) => state.user.email);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const email = userEmail;

    useEffect(() => {
        if (!email) {
            setError("login");
            setLoading(false);
            return;
        }
        axios.get(`/api/v2/product/my-products?email=${email}`)
            .then((res) => {
                setProducts(res.data?.products || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [email]);

    return (
        <div className="page-container">
            <Nav />
            <div className="content-wrapper animate-page">
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <h1 className="section-title">My Products</h1>
                    <button className="btn btn-primary" onClick={() => navigate('/Create-Product')}>
                        <AiOutlinePlus size={15} />
                        Add Product
                    </button>
                </div>

                {/* Loading skeleton grid */}
                {loading && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                <div className="skeleton" style={{ height: '180px' }} />
                                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div className="skeleton" style={{ height: '16px', width: '70%' }} />
                                    <div className="skeleton" style={{ height: '12px', width: '90%' }} />
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        <div className="skeleton" style={{ height: '36px', flex: 1, borderRadius: '8px' }} />
                                        <div className="skeleton" style={{ height: '36px', flex: 1, borderRadius: '8px' }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Not logged in */}
                {!loading && error === 'login' && (
                    <div className="empty-state" style={{ minHeight: '50vh' }}>
                        <AiOutlineAppstore className="empty-state-icon" size={56} />
                        <h2 className="empty-state-title">Sign in to see your products</h2>
                        <p className="empty-state-subtitle">You need to be logged in to manage your products.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/login')}>Sign In</button>
                    </div>
                )}

                {/* API error */}
                {!loading && error && error !== 'login' && (
                    <div className="empty-state" style={{ minHeight: '50vh' }}>
                        <AiOutlineReload className="empty-state-icon" size={56} />
                        <h2 className="empty-state-title">Couldn&apos;t load products</h2>
                        <p className="empty-state-subtitle">{error}</p>
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>
                            <AiOutlineReload size={15} />
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && products.length === 0 && (
                    <div className="empty-state" style={{ minHeight: '50vh' }}>
                        <AiOutlineAppstore className="empty-state-icon" size={60} />
                        <h2 className="empty-state-title">No Products Added</h2>
                        <p className="empty-state-subtitle">You haven&apos;t created any products yet. Start listing your first product!</p>
                        <button className="btn btn-primary btn-lg" onClick={() => navigate('/Create-Product')}>
                            <AiOutlinePlus size={16} />
                            Create a Product
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && !error && products.length > 0 && (
                    <>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem', fontWeight: 500 }}>
                            {products.length} product{products.length !== 1 ? 's' : ''}
                        </p>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                                gap: '1.25rem',
                            }}
                        >
                            {products.map((product, i) => (
                                <div
                                    key={product._id}
                                    className={`card-delay-${Math.min(i + 1, 5)}`}
                                    style={{ animation: 'fadeInUp 0.35s ease both' }}
                                >
                                    <MyProductCard {...product} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

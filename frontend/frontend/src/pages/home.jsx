import React, { useEffect, useState } from "react";
import Product from "../components/product";
import Nav from "../components/nav";
import axios from "../axios.config";
import { AiOutlineShoppingCart, AiOutlineReload } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    axios.get("/api/v2/product/get-products")
      .then((res) => {
        setProducts(res.data?.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="page-container">
      <Nav />

      {/* Hero Bar */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-surface-alt) 0%, var(--color-surface) 100%)',
          borderBottom: '1px solid var(--color-border)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          animation: 'fadeInUp 0.3s ease both',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            margin: '0 0 0.5rem',
            letterSpacing: '-0.03em',
          }}
        >
          Welcome to ShopEase
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>
          Discover quality products at great prices
        </p>
      </div>

      <div className="content-wrapper">
        {/* Loading State */}
        {loading && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.25rem',
              padding: '1rem 0',
            }}
          >
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <div className="skeleton" style={{ height: '180px' }} />
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div className="skeleton" style={{ height: '16px', width: '70%' }} />
                  <div className="skeleton" style={{ height: '12px', width: '90%' }} />
                  <div className="skeleton" style={{ height: '12px', width: '50%' }} />
                  <div className="skeleton" style={{ height: '36px', borderRadius: '8px', marginTop: '0.5rem' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="empty-state" style={{ minHeight: '50vh' }}>
            <div className="empty-state-icon">
              <AiOutlineReload size={56} />
            </div>
            <h2 className="empty-state-title">Something went wrong</h2>
            <p className="empty-state-subtitle">{error}</p>
            <button className="btn btn-primary" onClick={fetchProducts}>
              <AiOutlineReload size={16} />
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="empty-state" style={{ minHeight: '50vh' }}>
            <div className="empty-state-icon">
              <AiOutlineShoppingCart size={64} />
            </div>
            <h2 className="empty-state-title">No Products Yet</h2>
            <p className="empty-state-subtitle">
              Be the first to add a product to the store!
            </p>
            <Link to="/Create-Product" className="btn btn-primary btn-lg">
              Add Your First Product
            </Link>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 className="section-title">All Products</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                {products.length} item{products.length !== 1 ? 's' : ''}
              </span>
            </div>
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
                  <Product {...product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

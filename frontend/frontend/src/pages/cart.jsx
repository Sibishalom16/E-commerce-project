import CartProduct from '../components/CartProduct';
import Nav from '../components/nav';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../axios.config';
import { AiOutlineShoppingCart, AiOutlineArrowRight } from 'react-icons/ai';

const Cart = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = useSelector((state) => state.user.email);

  const fetchCart = () => {
    if (!userEmail) { setLoading(false); return; }
    axios.get(`/api/v2/product/cartproducts?email=${userEmail}`)
      .then((res) => {
        setProducts(
          res.data.cart.map(product => ({
            quantity: product.quantity,
            ...product.productId,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setLoading(false);
      });
  };

  useEffect(() => { fetchCart(); }, [userEmail]);

  const handleQuantityChange = (productId, newQuantity) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p._id === productId ? { ...p, quantity: newQuantity } : p
      )
    );
  };

  const cartTotal = products.reduce((acc, p) => acc + (Number(p.price) * Number(p.quantity)), 0);
  const cartSubtotal = cartTotal;

  const handlePlaceOrder = () => navigate('/select-address');

  return (
    <div className="page-container">
      <Nav />
      <div className="content-wrapper animate-page" style={{ maxWidth: '860px' }}>
        <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>
          My Cart
        </h1>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div className="skeleton" style={{ width: '80px', height: '80px', borderRadius: '10px', flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div className="skeleton" style={{ height: '14px', width: '55%' }} />
                  <div className="skeleton" style={{ height: '12px', width: '30%' }} />
                </div>
                <div className="skeleton" style={{ height: '32px', width: '100px', borderRadius: '8px' }} />
              </div>
            ))}
          </div>
        )}

        {/* Not logged in */}
        {!loading && !userEmail && (
          <div className="empty-state" style={{ minHeight: '50vh' }}>
            <AiOutlineShoppingCart className="empty-state-icon" size={56} />
            <h2 className="empty-state-title">Sign in to see your cart</h2>
            <p className="empty-state-subtitle">Your cart items will appear here after you log in.</p>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>Sign In</button>
          </div>
        )}

        {/* Empty Cart */}
        {!loading && userEmail && products.length === 0 && (
          <div className="empty-state" style={{ minHeight: '50vh' }}>
            <AiOutlineShoppingCart className="empty-state-icon" size={64} />
            <h2 className="empty-state-title">Your cart is empty</h2>
            <p className="empty-state-subtitle">Browse products and add something you like!</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>
              Start Shopping
            </button>
          </div>
        )}

        {/* Cart Items + Summary */}
        {!loading && userEmail && products.length > 0 && (
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Items list */}
            <div style={{ flex: '1 1 400px', minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                  {products.length} item{products.length !== 1 ? 's' : ''}
                </span>
              </div>
              {products.map(product => (
                <CartProduct
                  key={product._id}
                  {...product}
                  onQuantityChange={(newQty) => handleQuantityChange(product._id, newQty)}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ flex: '0 0 260px', minWidth: '220px' }}>
              <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '80px' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', margin: '0 0 1.25rem' }}>
                  Order Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
                    <span style={{ fontWeight: 600 }}>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Shipping</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>Free</span>
                  </div>
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: 'var(--color-border)',
                      margin: '0.25rem 0',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)' }}>Total</span>
                    <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-primary)' }}>
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-full btn-lg"
                  onClick={handlePlaceOrder}
                  style={{ borderRadius: '10px' }}
                >
                  Place Order
                  <AiOutlineArrowRight size={16} />
                </button>
                <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '0.75rem' }}>
                  Address selection & payment on next step
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

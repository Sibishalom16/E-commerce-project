import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/userActions';
import axios from '../axios.config';
import {
    AiOutlineHome,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlinePlusSquare,
    AiOutlineAppstore,
    AiOutlineUnorderedList,
    AiOutlineMenu,
    AiOutlineClose,
    AiOutlineLogout,
} from 'react-icons/ai';

const NAV_ITEMS_AUTH = [
    { to: '/', label: 'Home', icon: AiOutlineHome, end: true },
    { to: '/my-products', label: 'My Products', icon: AiOutlineAppstore, end: false },
    { to: '/Create-Product', label: 'Add Product', icon: AiOutlinePlusSquare, end: false },
    { to: '/cart', label: 'Cart', icon: AiOutlineShoppingCart, end: false },
    { to: '/profile', label: 'Profile', icon: AiOutlineUser, end: false },
    { to: '/myorders', label: 'My Orders', icon: AiOutlineUnorderedList, end: false },
];

const NAV_ITEMS_UNAUTH = [
    { to: '/', label: 'Home', icon: AiOutlineHome, end: true },
    { to: '/login', label: 'Login', icon: AiOutlineUser, end: false },
];

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const userEmail = useSelector((state) => state.user.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeMenu = () => setIsOpen(false);

    const handleLogout = async () => {
        try {
            await axios.post('/api/v2/user/logout');
        } catch (error) {
            console.error("Logout request failed", error);
        }
        dispatch(logoutUser());
        closeMenu();
        navigate('/login');
    };

    const activeNavItems = userEmail ? NAV_ITEMS_AUTH : NAV_ITEMS_UNAUTH;

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

                    {/* ── Logo ── */}
                    <NavLink
                        to="/"
                        onClick={closeMenu}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                    >
                        <div
                            style={{
                                width: '34px',
                                height: '34px',
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 8px rgb(37 99 235 / 0.35)',
                            }}
                        >
                            <AiOutlineShoppingCart size={18} color="white" />
                        </div>
                        <span
                            style={{
                                fontWeight: 800,
                                fontSize: '1.15rem',
                                color: 'var(--color-text-primary)',
                                letterSpacing: '-0.03em',
                            }}
                        >
                            ShopEase
                        </span>
                    </NavLink>

                    {/* ── Desktop Links ── */}
                    <div className="desktop-flex" style={{ display: 'none', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'flex-end' }}>
                        <ul
                            style={{
                                listStyle: 'none',
                                margin: 0,
                                padding: 0,
                                display: 'flex',
                                gap: '0.25rem',
                                alignItems: 'center',
                            }}
                        >
                            {activeNavItems.map(({ to, label, icon: Icon, end }) => (
                                <li key={to}>
                                    <NavLink
                                        to={to}
                                        end={end}
                                        className={({ isActive }) =>
                                            `nav-link${isActive ? ' active' : ''}`
                                        }
                                    >
                                        <Icon size={16} aria-hidden="true" />
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        {userEmail && (
                            <button
                                onClick={handleLogout}
                                className="nav-link"
                                style={{ color: 'var(--color-danger)', border: 'none', background: 'none', cursor: 'pointer', outline: 'none' }}
                            >
                                <AiOutlineLogout size={16} />
                                Logout
                            </button>
                        )}
                    </div>

                    {/* ── Hamburger ── */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        className="hamburger-btn"
                        style={{
                            background: 'none',
                            border: '1.5px solid var(--color-border)',
                            borderRadius: '8px',
                            padding: '6px',
                            cursor: 'pointer',
                            color: 'var(--color-text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background var(--transition-fast), color var(--transition-fast)',
                        }}
                    >
                        {isOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                    </button>
                </div>
            </div>

            {/* ── Mobile Menu ── */}
            {isOpen && (
                <div
                    id="mobile-menu"
                    className="animate-fadeIn"
                    style={{
                        borderTop: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-surface)',
                        padding: '0.75rem 1rem 1rem',
                    }}
                >
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {activeNavItems.map(({ to, label, icon: Icon, end }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    end={end}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `nav-link${isActive ? ' active' : ''}`
                                    }
                                    style={{ width: '100%' }}
                                >
                                    <Icon size={17} aria-hidden="true" />
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                        {userEmail && (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="nav-link"
                                    style={{ width: '100%', textAlign: 'left', color: 'var(--color-danger)', border: 'none', background: 'none', cursor: 'pointer', outline: 'none' }}
                                >
                                    <AiOutlineLogout size={17} aria-hidden="true" />
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}

            <style>{`
        @media (min-width: 900px) {
          .desktop-flex { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
      `}</style>
        </nav>
    );
};

export default NavBar;
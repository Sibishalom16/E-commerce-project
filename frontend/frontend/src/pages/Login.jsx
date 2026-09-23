import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock, AiOutlineShoppingCart } from "react-icons/ai";
import axios from "../axios.config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setemail } from "../store/userActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/v2/user/login", { email, password });
      console.log(response.data);
      dispatch(setemail(email));
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgb(37 99 235 / 0.35)',
              marginBottom: '1rem',
            }}
          >
            <AiOutlineShoppingCart size={26} color="white" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 0.25rem', letterSpacing: '-0.03em' }}>
            Welcome back
          </h1>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Sign in to your account
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div
            className="animate-fadeIn"
            style={{
              backgroundColor: 'var(--color-danger-light)',
              border: '1px solid #fecaca',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              color: 'var(--color-danger)',
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Email */}
          <div>
            <label htmlFor="login-email" className="input-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <AiOutlineMail
                size={16}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}
              />
              <input
                id="login-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                style={{ paddingLeft: '2.25rem' }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="login-password" className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <AiOutlineLock
                size={16}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}
              />
              <input
                id="login-password"
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                style={{ paddingLeft: '2.25rem', paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                aria-label={visible ? "Hide password" : "Show password"}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  padding: '2px',
                  display: 'flex',
                }}
              >
                {visible ? <AiOutlineEye size={18} /> : <AiOutlineEyeInvisible size={18} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                style={{ accentColor: 'var(--color-primary)' }}
              />
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Remember me</span>
            </label>
            <a
              href="#"
              style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.75s linear infinite',
                    display: 'inline-block',
                  }}
                />
                Signing in...
              </>
            ) : 'Sign In'}
          </button>

          {/* Footer */}
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Don&apos;t have an account?{' '}
            <Link
              to="/create-user"
              style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

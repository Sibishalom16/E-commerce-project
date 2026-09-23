import { React, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineCamera,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "../axios.config";
import ValidationFormObject from "../../validation.js";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFileSubmit = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const validateFields = () => {
    const nameError = ValidationFormObject.validteName(name);
    const emailError = ValidationFormObject.validteEmail(email);
    const passwordError = ValidationFormObject.validtePass(password);
    const newErrors = {};
    if (nameError !== true) newErrors.name = nameError;
    if (emailError !== true) newErrors.email = emailError;
    if (passwordError !== true) newErrors.password = passwordError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    setLoading(true);
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    const config = {
      headers: { "Content-Type": "multipart/form-data", Accept: "any" },
    };
    axios.post("/api/v2/user/create-user", newForm, config)
      .then((res) => {
        console.log("result", res.data);
        alert("Account created successfully! Please login.");
        navigate("/login");
      })
      .catch((err) => {
        console.log("error", err.message);
        alert(err.response?.data?.message || "Registration failed. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth-page" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
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
            Create account
          </h1>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Join ShopEase today
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {/* Avatar Upload */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  border: '2px solid var(--color-border)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-surface-alt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <RxAvatar size={40} color="var(--color-text-muted)" />
                )}
              </div>
              <label
                htmlFor="file-input"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '2px solid white',
                }}
                aria-label="Upload profile photo"
              >
                <AiOutlineCamera size={13} color="white" />
              </label>
              <input
                type="file"
                id="file-input"
                name="avatar"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileSubmit}
                className="sr-only"
                style={{ display: 'none' }}
              />
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              {avatar ? avatar.name : 'Click camera to upload photo (optional)'}
            </span>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="signup-name" className="input-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <AiOutlineUser size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                id="signup-name"
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`input-field${errors.name ? ' input-error' : ''}`}
                placeholder="Your full name"
                style={{ paddingLeft: '2.25rem' }}
              />
            </div>
            {errors.name && <p className="input-error-msg">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="signup-email" className="input-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <AiOutlineMail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                id="signup-email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`input-field${errors.email ? ' input-error' : ''}`}
                placeholder="you@example.com"
                style={{ paddingLeft: '2.25rem' }}
              />
            </div>
            {errors.email && <p className="input-error-msg">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="signup-password" className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <AiOutlineLock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                id="signup-password"
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`input-field${errors.password ? ' input-error' : ''}`}
                placeholder="Min 8 chars, uppercase & special"
                style={{ paddingLeft: '2.25rem', paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                aria-label={visible ? "Hide password" : "Show password"}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', padding: '2px' }}
              >
                {visible ? <AiOutlineEye size={18} /> : <AiOutlineEyeInvisible size={18} />}
              </button>
            </div>
            {errors.password && <p className="input-error-msg">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
            style={{ marginTop: '0.5rem' }}
          >
            {loading ? (
              <>
                <span style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.75s linear infinite', display: 'inline-block' }} />
                Creating account...
              </>
            ) : 'Create Account'}
          </button>

          {/* Footer */}
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

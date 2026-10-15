import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fkcLogo from '../assets/FKCLegalLogo.png';

const API_URL = import.meta.env.VITE_API_URL || "https://fkclegalbackend.onrender.com";

// Clicking the logo this many times in a row (each click within the window) toggles the sign up form.
const LOGO_CLICKS_REQUIRED = 4;
const LOGO_CLICK_WINDOW = 1500;

const EMPTY_SIGNUP = { username: '', password: '', confirm: '', code: '' };

const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' };
const fieldStyle = {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    outline: 'none',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s'
};

const SIGNUP_FIELDS = [
    { key: 'username', label: 'Username', type: 'text', placeholder: 'Choose a username', autoComplete: 'username' },
    { key: 'password', label: 'Passcode', type: 'password', placeholder: 'Choose a passcode (8+ characters)', autoComplete: 'new-password' },
    { key: 'confirm', label: 'Confirm Passcode', type: 'password', placeholder: 'Re-enter your passcode', autoComplete: 'new-password' },
    { key: 'code', label: 'Sign Up Code', type: 'password', placeholder: 'Enter the sign up code', autoComplete: 'off' }
];

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const [showSignup, setShowSignup] = useState(false);
    const [signupForm, setSignupForm] = useState(EMPTY_SIGNUP);
    const [signupError, setSignupError] = useState('');
    const [signupLoading, setSignupLoading] = useState(false);
    const logoClicks = useRef({ count: 0, timer: null });

    const navigate = useNavigate();

    useEffect(() => {
        const lockedUntil = localStorage.getItem('lockout_until');
        if (lockedUntil) {
            const now = Date.now();
            const remaining = Math.ceil((parseInt(lockedUntil, 10) - now) / 1000);
            if (remaining > 0) {
                setIsLocked(true);
                setCountdown(remaining);
                setError(`Maximum login attempts reached. Please wait ${remaining}s.`);
            } else {
                localStorage.removeItem('lockout_until');
                localStorage.removeItem('login_attempts');
            }
        }

        const savedAttempts = localStorage.getItem('login_attempts');
        if (savedAttempts) {
            setAttempts(parseInt(savedAttempts, 10));
        }
    }, []);

    useEffect(() => {
        let timer;
        if (isLocked && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsLocked(false);
                        setAttempts(0);
                        setError('');
                        localStorage.removeItem('lockout_until');
                        localStorage.removeItem('login_attempts');
                        return 0;
                    }
                    setError(`Maximum login attempts reached. Please wait ${prev - 1}s.`);
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isLocked, countdown]);

    useEffect(() => () => clearTimeout(logoClicks.current.timer), []);

    // Secret entrance: click the logo 4 times in a row to show (or hide) the sign up form.
    const handleLogoClick = () => {
        const state = logoClicks.current;
        clearTimeout(state.timer);
        state.count += 1;

        if (state.count >= LOGO_CLICKS_REQUIRED) {
            state.count = 0;
            setShowSignup((prev) => !prev);
            setSignupError('');
            setSuccess('');
            setSignupForm(EMPTY_SIGNUP);
            return;
        }

        state.timer = setTimeout(() => { state.count = 0; }, LOGO_CLICK_WINDOW);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isLocked) return;
        setSuccess('');

        try {
            const response = await axios.post(`${API_URL}/api/token/`, {
                username,
                password
            });
            localStorage.removeItem('lockout_until');
            localStorage.removeItem('login_attempts');
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            navigate('/admin/dashboard');
        } catch (err) {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            localStorage.setItem('login_attempts', newAttempts);

            if (newAttempts >= 4) {
                const lockUntil = Date.now() + 60 * 1000;
                localStorage.setItem('lockout_until', lockUntil.toString());
                setIsLocked(true);
                setCountdown(60);
                setError('Maximum login attempts reached. Please wait 60s.');
            } else {
                setError(`Invalid credentials. Attempt ${newAttempts} of 4.`);
            }
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (signupLoading) return;
        setSignupError('');

        const newUsername = signupForm.username.trim();
        if (signupForm.password !== signupForm.confirm) {
            setSignupError('Passcodes do not match.');
            return;
        }
        if (signupForm.password.length < 8) {
            setSignupError('Passcode must be at least 8 characters.');
            return;
        }

        setSignupLoading(true);
        try {
            await axios.post(`${API_URL}/api/admin/signup/`, {
                username: newUsername,
                password: signupForm.password,
                signup_code: signupForm.code
            });
            setSignupForm(EMPTY_SIGNUP);
            setShowSignup(false);
            setUsername(newUsername);
            setPassword('');
            setError('');
            setSuccess(`Admin account "${newUsername}" created. You can now sign in.`);
        } catch (err) {
            setSignupError(err.response?.data?.error || 'Sign up failed. Please try again.');
        } finally {
            setSignupLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            fontFamily: 'Inter, system-ui, sans-serif',
            color: '#1a1a1a',
            padding: '110px 20px 90px 20px',
            boxSizing: 'border-box'
        }}>
            <div style={{
                position: 'absolute',
                top: '30px',
                left: '40px'
            }}>
                <img
                    src={fkcLogo}
                    alt="FKC Legal Logo"
                    onClick={handleLogoClick}
                    draggable={false}
                    style={{
                        height: '65px',
                        width: 'auto',
                        objectFit: 'contain',
                        cursor: 'default',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        WebkitTapHighlightColor: 'transparent'
                    }}
                />
            </div>

            <div style={{
                width: '100%',
                maxWidth: '420px',
                padding: '40px',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{ marginBottom: '28px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' }}>
                        {showSignup ? 'Create Admin Account' : 'Admin Portal'}
                    </h2>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                        {showSignup
                            ? 'A sign up code is required to create an account'
                            : 'Secure access for authorized personnel only'}
                    </p>
                </div>

                {success && !showSignup && (
                    <div style={{
                        backgroundColor: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        color: '#065f46',
                        padding: '12px 16px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {success}
                    </div>
                )}

                {(showSignup ? signupError : error) && (
                    <div style={{
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#991b1b',
                        padding: '12px 16px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {showSignup ? signupError : error}
                    </div>
                )}

                {showSignup ? (
                    <form onSubmit={handleSignup}>
                        {SIGNUP_FIELDS.map((field) => (
                            <div key={field.key} style={{ marginBottom: '20px' }}>
                                <label style={labelStyle}>{field.label}</label>
                                <input
                                    type={field.type}
                                    value={signupForm[field.key]}
                                    onChange={(e) => setSignupForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                                    disabled={signupLoading}
                                    required
                                    placeholder={field.placeholder}
                                    autoComplete={field.autoComplete}
                                    style={fieldStyle}
                                    onFocus={(e) => e.target.style.borderColor = '#b29051'}
                                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={signupLoading}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: signupLoading ? '#9ca3af' : '#b29051',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: signupLoading ? 'not-allowed' : 'pointer',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => { if (!signupLoading) e.target.style.backgroundColor = '#9e7e45'; }}
                            onMouseOut={(e) => { if (!signupLoading) e.target.style.backgroundColor = '#b29051'; }}
                        >
                            {signupLoading ? 'Creating account...' : 'Create Account'}
                        </button>

                        <button
                            type="button"
                            onClick={() => { setShowSignup(false); setSignupError(''); setSignupForm(EMPTY_SIGNUP); }}
                            style={{
                                display: 'block',
                                margin: '16px auto 0',
                                background: 'none',
                                border: 'none',
                                color: '#6b7280',
                                fontSize: '13px',
                                cursor: 'pointer'
                            }}
                        >
                            Back to sign in
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLocked}
                                required
                                placeholder="Enter your username"
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    fontSize: '14px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    outline: 'none',
                                    backgroundColor: isLocked ? '#f3f4f6' : '#fff',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#b29051'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                                Passcode
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLocked}
                                required
                                placeholder="Enter your passcode"
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    fontSize: '14px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    outline: 'none',
                                    backgroundColor: isLocked ? '#f3f4f6' : '#fff',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#b29051'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLocked}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: isLocked ? '#9ca3af' : '#b29051',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: isLocked ? 'not-allowed' : 'pointer',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => { if (!isLocked) e.target.style.backgroundColor = '#9e7e45'; }}
                            onMouseOut={(e) => { if (!isLocked) e.target.style.backgroundColor = '#b29051'; }}
                        >
                            {isLocked ? `Locked (${countdown}s)` : 'Sign In'}
                        </button>
                    </form>
                )}
            </div>

            <footer style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#ffffff',
                borderTop: '1px solid #e5e7eb',
                padding: '16px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.75rem',
                color: '#6b7280',
                boxSizing: 'border-box'
            }}>
                <span>© {new Date().getFullYear()} FKC Legal. All rights reserved.</span>
                <span style={{ color: '#b29051', fontWeight: '500' }}>Powered by Reseau Technologies</span>
            </footer>
        </div>
    );
}
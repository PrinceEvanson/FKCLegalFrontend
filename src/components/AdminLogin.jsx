import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fkcLogo from '../assets/FKCLegalLogo.png';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isLocked) return;

        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            navigate('/admin/dashboard');
        } catch (err) {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 4) {
                setIsLocked(true);
                setError('Maximum login attempts reached. Form is locked.');
            } else {
                setError(`Invalid credentials. Attempt ${newAttempts} of 4.`);
            }
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
            padding: '20px',
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
                    style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
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
                        Admin Portal
                    </h2>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                        Secure access for authorized personnel only
                    </p>
                </div>

                {error && (
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
                        {error}
                    </div>
                )}

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
                        {isLocked ? 'Locked Out' : 'Sign In'}
                    </button>
                </form>
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
                <span style={{ color: '#b29051', fontWeight: '500' }}>Powered by XDEVER</span>
            </footer>
        </div>
    );
}
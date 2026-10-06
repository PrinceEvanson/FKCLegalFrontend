import React from 'react';
import fkcLogo from '../assets/FKCLegalLogo.png';

/**
 * Compact footer pinned to the bottom of the screen.
 * `visible` slides it in/out; the dashboard shows it only while the navbar is hidden.
 */
export default function AdminFooter({ visible = true }) {
    return (
        <footer
            aria-hidden={!visible}
            style={{
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 40,
                background: '#111827',
                borderTop: '1px solid #1f2937',
                padding: '8px 20px',
                boxSizing: 'border-box',
                transform: visible ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.3s ease'
            }}
        >
            <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px 20px', flexWrap: 'wrap' }}>
                <img src={fkcLogo} alt="FKC Legal Logo" style={{ height: '45px', width: 'auto', objectFit: 'contain' }} />
                <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                    © {new Date().getFullYear()} FKC Legal. All rights reserved.
                </span>
                <span style={{ color: '#b29051', fontSize: '0.75rem', fontWeight: '500' }}>Powered by XDEVER</span>
            </div>
        </footer>
    );
}
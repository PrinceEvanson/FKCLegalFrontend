import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bell, Mail, MailOpen, X } from 'lucide-react';
import AdminFooter from '../components/AdminFooter';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const MIN_PRICE = 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_SERVICES = { contacts: 'General Contact Inquiry', diplomats: 'Diplomatic Inquiry' };
const LOCKED_MESSAGE = 'Mark this request as read in Details before setting its status or price.';

const PLACEHOLDERS = [
    'Search by client name...',
    'Search by email address...',
    'Search by phone number...',
    'Search by service or course...',
    'Search by date (e.g. 2026-10-02)...'
];

// Tables scroll inside their own box: header stays put, about 7 rows show at a time
// (fewer on short screens so the table never runs under the fixed footer).
const ROW_HEIGHT = 88;
const HEADER_HEIGHT = 52;
const VISIBLE_ROWS = 7;
const TABLE_MAX_HEIGHT = `max(260px, min(${HEADER_HEIGHT + VISIBLE_ROWS * ROW_HEIGHT}px, calc(100vh - 170px)))`;

const C = {
    bg: '#0b0f19', panel: '#111827', border: '#1f2937', gold: '#b29051',
    text: '#f3f4f6', muted: '#94a3b8', faint: '#64748b', green: '#34d399'
};

const S = {
    card: { background: C.panel, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '20px' },
    statLabel: { color: C.muted, fontSize: '0.85rem', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '0.05em' },
    statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' },
    tableWrap: { background: C.panel, border: `1px solid ${C.border}`, borderRadius: '10px', overflow: 'auto', maxHeight: TABLE_MAX_HEIGHT },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' },
    headRow: { background: C.border, color: C.gold, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
    th: { padding: '15px 20px', position: 'sticky', top: 0, zIndex: 2, background: C.border },
    td: { padding: '15px 20px' },
    row: { borderBottom: `1px solid ${C.border}`, height: `${ROW_HEIGHT}px` },
    select: { background: C.panel, color: C.text, border: `1px solid ${C.border}`, padding: '8px 12px', borderRadius: '6px', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' },
    cellSelect: { background: C.border, color: '#93c5fd', border: '1px solid #374151', padding: '6px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', width: '130px', boxSizing: 'border-box' },
    goldBtn: { padding: '8px 16px', background: C.gold, color: C.bg, border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' },
    ghostBtn: { padding: '8px 16px', background: 'transparent', color: C.muted, border: `1px solid ${C.border}`, borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' },
    toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '15px', flexWrap: 'wrap' },
    sub: { fontSize: '0.8rem', color: C.faint },
    iconBtn: { display: 'inline-flex', alignItems: 'center', gap: '8px' }
};

/* ---------- helpers ---------- */

const clearSession = () => {
    ['access_token', 'refresh_token', 'username'].forEach(k => localStorage.removeItem(k));
};
const authConfig = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
const isAuthError = (err) => [401, 403].includes(err?.response?.status);

const parseAmount = (v) => parseFloat(String(v ?? '').replace(/[^\d.]/g, '')) || 0;
const formatPrice = (v) => {
    const n = Math.round(parseAmount(v));
    return (n > 0 ? n : MIN_PRICE).toLocaleString('en-US');
};
const digitsOf = (v) => String(Math.round(parseAmount(v)) || MIN_PRICE);
const formatKsh = (n) => `Ksh ${Math.round(n).toLocaleString('en-US')}`;
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : '—');
const fmtTime = (d) => (d ? new Date(d).toLocaleTimeString() : '');
const fmtDateTime = (d) => (d ? `${fmtDate(d)} ${fmtTime(d)}` : '—');
const dateText = (d) => (d ? `${new Date(d).toLocaleDateString()} ${new Date(d).toISOString().slice(0, 10)}` : '');

const matches = (query, ...fields) => {
    const q = query.trim().toLowerCase();
    return !q || fields.some(f => String(f ?? '').toLowerCase().includes(q));
};

const validatePrice = (raw) => {
    const num = parseInt(String(raw ?? '').replace(/\D/g, '') || '0', 10);
    if (num < MIN_PRICE) return { valid: false, message: `Price cannot be less than ${MIN_PRICE.toLocaleString('en-US')} Ksh.` };
    return { valid: true, formatted: num.toLocaleString('en-US') };
};

// Maps backend inquiry fields (contacts and diplomats share the same shape) onto what the UI uses.
const normalizeInquiry = (kind, c) => ({
    ...c,
    phone: c.number || '',
    service: c.subject || DEFAULT_SERVICES[kind],
    fulfillment_status: c.fulfillment_status || 'Incomplete',
    payment_status: c.payment_status || 'Pending',
    price: formatPrice(c.price),
    price_set: Boolean(c.price_set),
    is_read: Boolean(c.is_read),
    updates: Array.isArray(c.updates) ? c.updates : []
});

// A "new arrival" is an unread request made within the last 24 hours.
const isNewArrival = (item, now) => !item.is_read && now - new Date(item.created_at).getTime() < DAY_MS;

// Unread requests first (newest first), then everything already read (newest first).
const sortInquiries = (rows) => [...rows].sort((a, b) => {
    if (a.is_read !== b.is_read) return a.is_read ? 1 : -1;
    return new Date(b.created_at) - new Date(a.created_at);
});

const paymentColor = (status) => {
    if (status === 'Completed') return '#065f46';
    if (status === 'Failed') return '#991b1b';
    return '#854d0e';
};

const noticeColor = { error: '#7f1d1d', success: '#065f46', warn: '#92400e' };

const inquiryRevenue = (rows) => rows
    .filter(c => c.payment_status === 'Completed' && c.price_set)
    .reduce((sum, c) => sum + parseAmount(c.price), 0);

/* ---------- small components ---------- */

function StatCard({ label, value, gold }) {
    return (
        <div style={S.card}>
            <p style={S.statLabel}>{label}</p>
            <h3 style={{ color: gold ? C.gold : C.text, fontSize: '1.8rem', margin: 0 }}>{value}</h3>
        </div>
    );
}

function SearchBox({ value, onChange, placeholder, visible }) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
                background: C.panel, color: C.text, border: `1px solid ${C.border}`,
                padding: '8px 16px', borderRadius: '6px', fontSize: '0.9rem', width: '320px',
                maxWidth: '100%', outline: 'none', opacity: visible ? 1 : 0.4, transition: 'opacity 0.3s ease'
            }}
        />
    );
}

function DataTable({ headers, isEmpty, emptyText, children }) {
    return (
        <div style={S.tableWrap}>
            <table style={S.table}>
                <thead>
                    <tr style={S.headRow}>
                        {headers.map((h, i) => <th key={i} style={S.th}>{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {children}
                    {isEmpty && (
                        <tr>
                            <td colSpan={headers.length} style={{ padding: '30px', textAlign: 'center', color: C.muted }}>{emptyText}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function DateCell({ value }) {
    return (
        <td style={{ ...S.td, color: C.muted }}>
            <div>{fmtDate(value)}</div>
            <div style={S.sub}>{fmtTime(value)}</div>
        </td>
    );
}

function Badge({ color, children }) {
    return (
        <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', background: color, color: '#fff' }}>
            {children}
        </span>
    );
}

// In-site alert for requests that still need to be marked as read.
function NewArrivalsBanner({ newCount, unreadContacts, unreadDiplomats, onGo, onDismiss }) {
    const unreadTotal = unreadContacts + unreadDiplomats;
    const olderUnread = unreadTotal - newCount;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', background: 'rgba(178,144,81,0.12)', border: `1px solid ${C.gold}`, borderRadius: '10px', padding: '14px 18px', marginBottom: '25px' }}>
            <Bell size={22} color={C.gold} />
            <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ fontWeight: '600', color: C.text }}>
                    {newCount > 0
                        ? `${plural(newCount, 'new service request')} in the last 24 hours`
                        : `${plural(unreadTotal, 'service request')} still unread`}
                </div>
                <div style={{ ...S.sub, color: C.muted, marginTop: '2px' }}>
                    Open Details and mark each one as read before setting its status, price or updates.
                    {newCount > 0 && olderUnread > 0 ? ` ${plural(olderUnread, 'older request')} also unread.` : ''}
                </div>
            </div>
            {unreadContacts > 0 && (
                <button style={S.goldBtn} onClick={() => onGo('contacts')}>General Inquiries ({unreadContacts})</button>
            )}
            {unreadDiplomats > 0 && (
                <button style={S.goldBtn} onClick={() => onGo('diplomats')}>Diplomat Inquiries ({unreadDiplomats})</button>
            )}
            <button
                aria-label="Dismiss notification"
                onClick={onDismiss}
                style={{ background: 'transparent', border: 'none', color: C.muted, cursor: 'pointer', display: 'flex', padding: '4px' }}
            >
                <X size={18} />
            </button>
        </div>
    );
}

// One table for both General Inquiries and Diplomat Inquiries.
function InquiryTable({ kind, rows, now, emptyText, openLabel, drafts, setDrafts, savingKey, onUpdate, onSavePrice, onLockedClick, onOpen }) {
    return (
        <DataTable
            headers={['Client Name', 'Email / Phone Number', 'Service / Details', 'Status', 'Payment Status', 'Price', '']}
            isEmpty={rows.length === 0}
            emptyText={emptyText}
        >
            {rows.map(item => {
                const rowSaving = savingKey === `${kind}:${item.id}`;
                const draftKey = `row:${kind}:${item.id}`;
                const draft = drafts[draftKey] ?? digitsOf(item.price);
                const locked = !item.is_read;
                const isNew = isNewArrival(item, now);
                const extra = kind === 'diplomats'
                    ? [item.diplomatic_status, item.mission_or_country].filter(Boolean).join(' · ')
                    : '';
                // Locked controls ignore the pointer so the wrapper can show the "mark as read" reminder.
                const lockWrap = {
                    opacity: locked ? 0.45 : 1,
                    cursor: locked ? 'not-allowed' : 'auto'
                };
                const lockInner = locked ? { pointerEvents: 'none' } : {};
                return (
                    <tr key={item.id} style={{ ...S.row, opacity: rowSaving ? 0.6 : 1, background: locked ? 'rgba(178,144,81,0.06)' : 'transparent' }}>
                        <td style={{ ...S.td, fontWeight: '500', boxShadow: locked ? `inset 3px 0 0 ${C.gold}` : 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span title={locked ? 'Unread' : 'Read'} style={{ display: 'inline-flex' }}>
                                    {locked ? <Mail size={16} color={C.gold} /> : <MailOpen size={16} color={C.faint} />}
                                </span>
                                <span>{item.name}</span>
                            </div>
                            {locked && (
                                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                                    <Badge color="#854d0e">Unread</Badge>
                                    {isNew && <Badge color="#b91c1c">New</Badge>}
                                </div>
                            )}
                        </td>
                        <td style={{ ...S.td, color: C.muted }}>
                            <div>{item.email || 'No Email'}</div>
                            <div style={S.sub}>{item.phone || 'No Phone Number Registered'}</div>
                        </td>
                        <td style={{ ...S.td, color: C.gold }}>
                            {item.service}
                            {extra && <div style={S.sub}>{extra}</div>}
                        </td>
                        <td style={S.td}>
                            <div style={lockWrap} onClick={locked ? onLockedClick : undefined} title={locked ? 'Mark as read first' : undefined}>
                                <select
                                    value={item.fulfillment_status}
                                    disabled={rowSaving || locked}
                                    onChange={(e) => onUpdate(kind, item.id, { fulfillment_status: e.target.value })}
                                    style={{ background: item.fulfillment_status === 'Fulfilled' ? '#065f46' : '#854d0e', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', ...lockInner }}
                                >
                                    <option value="Incomplete" style={{ background: C.panel, color: '#fff' }}>Incomplete</option>
                                    <option value="Fulfilled" style={{ background: C.panel, color: '#fff' }}>Fulfilled</option>
                                </select>
                            </div>
                        </td>
                        <td style={S.td}>
                            <div style={lockWrap} onClick={locked ? onLockedClick : undefined} title={locked ? 'Mark as read first' : undefined}>
                                <select
                                    value={item.payment_status}
                                    disabled={rowSaving || locked}
                                    onChange={(e) => onUpdate(kind, item.id, { payment_status: e.target.value })}
                                    style={{ ...S.cellSelect, ...lockInner }}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </td>
                        <td style={S.td}>
                            <div style={lockWrap} onClick={locked ? onLockedClick : undefined} title={locked ? 'Mark as read first' : undefined}>
                                {!item.price_set ? (
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', ...lockInner }}>
                                        <input
                                            type="text"
                                            value={draft}
                                            disabled={rowSaving || locked}
                                            onChange={(e) => setDrafts(prev => ({ ...prev, [draftKey]: e.target.value.replace(/\D/g, '') }))}
                                            style={{ width: '70px', background: C.border, color: '#fff', border: '1px solid #374151', borderRadius: '4px', padding: '6px 8px', fontSize: '0.8rem' }}
                                            placeholder="1000"
                                        />
                                        <button
                                            onClick={() => onSavePrice(kind, item.id, draft)}
                                            disabled={rowSaving || locked}
                                            style={{ background: C.gold, color: C.bg, border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}
                                        >
                                            Set
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ background: C.border, color: '#fff', border: '1px solid #374151', padding: '6px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', width: '130px', boxSizing: 'border-box', textAlign: 'center' }}>
                                        Ksh {item.price}
                                    </div>
                                )}
                            </div>
                        </td>
                        <td style={{ ...S.td, textAlign: 'right' }}>
                            <button onClick={() => onOpen(item.id)} style={S.goldBtn}>{openLabel}</button>
                        </td>
                    </tr>
                );
            })}
        </DataTable>
    );
}

function InquiryModal({ kind, item, priceDraft, onPriceChange, onSavePrice, onUpdate, onSetRead, onAddUpdate, onClose, saving }) {
    const [closeHover, setCloseHover] = useState(false);
    const [noteDraft, setNoteDraft] = useState('');
    const isDiplomat = kind === 'diplomats';
    const locked = !item.is_read;
    const updates = item.updates || [];
    const lastUpdate = updates.length ? updates[updates.length - 1] : null;

    const cell = (label, value, extraStyle = {}) => (
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '12px 14px', ...extraStyle }}>
            <div style={{ ...S.statLabel, fontSize: '0.75rem', marginBottom: '6px' }}>{label}</div>
            <div style={{ color: C.text, wordBreak: 'break-word' }}>{value || '—'}</div>
        </div>
    );
    const grid = { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px', marginBottom: '12px' };

    const submitNote = async () => {
        const ok = await onAddUpdate(kind, item.id, noteDraft.trim());
        if (ok) setNoteDraft('');
    };

    return (
        <div
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: '12px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '28px' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h3 style={{ margin: 0, color: C.gold, fontSize: '1.2rem' }}>
                            {isDiplomat ? 'Diplomat Inquiry Details' : 'Client Inquiry Details'}
                        </h3>
                        <div style={{ ...S.sub, marginTop: '4px' }}>Inquiry #{item.id} · {item.name}</div>
                    </div>
                    <button
                        onClick={onClose}
                        onMouseEnter={() => setCloseHover(true)}
                        onMouseLeave={() => setCloseHover(false)}
                        style={{ background: closeHover ? '#b91c1c' : 'transparent', color: closeHover ? '#fff' : C.muted, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', fontWeight: '600' }}
                    >
                        Close
                    </button>
                </div>

                {/* Read / unread */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
                    padding: '12px 14px', borderRadius: '8px', marginBottom: '16px',
                    background: locked ? 'rgba(178,144,81,0.15)' : 'rgba(6,95,70,0.25)',
                    border: `1px solid ${locked ? C.gold : '#065f46'}`
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {locked ? <Mail size={22} color={C.gold} /> : <MailOpen size={22} color={C.green} />}
                        <div>
                            <div style={{ fontWeight: '600', color: C.text }}>{locked ? 'Unread' : 'Read'}</div>
                            <div style={{ ...S.sub, color: C.muted }}>
                                {locked
                                    ? 'Mark as read to unlock status, payment, price and daily updates.'
                                    : `Marked as read${item.read_by ? ` by ${item.read_by}` : ''}${item.read_at ? ` on ${fmtDateTime(item.read_at)}` : ''}`}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => onSetRead(kind, item.id, locked)}
                        disabled={saving}
                        style={{ ...(locked ? S.goldBtn : S.ghostBtn), ...S.iconBtn }}
                    >
                        {locked ? <MailOpen size={16} /> : <Mail size={16} />}
                        {locked ? 'Mark as Read' : 'Mark as Unread'}
                    </button>
                </div>

                <div style={grid}>
                    {cell('Client Name', item.name)}
                    {cell('Subject / Service', item.service)}
                    {cell('Email', item.email)}
                    {cell('Phone Number', item.phone)}
                    {isDiplomat && cell('Diplomatic Status', item.diplomatic_status)}
                    {isDiplomat && cell('Mission / Country', item.mission_or_country)}
                </div>

                <div style={{ marginBottom: '12px' }}>
                    {cell(
                        'Message',
                        <span style={{ whiteSpace: 'pre-wrap', display: 'block', maxHeight: '180px', overflowY: 'auto' }}>{item.message}</span>
                    )}
                </div>

                <div style={grid}>
                    {cell('Service Requested At', fmtDateTime(item.created_at))}
                    {cell('Fulfilled At', item.fulfilled_at ? fmtDateTime(item.fulfilled_at) : 'Not yet fulfilled')}
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${C.border}`, opacity: locked ? 0.45 : 1 }}>
                    <div>
                        <div style={{ ...S.statLabel, fontSize: '0.75rem' }}>Status</div>
                        <select
                            value={item.fulfillment_status}
                            disabled={saving || locked}
                            onChange={(e) => onUpdate(kind, item.id, { fulfillment_status: e.target.value })}
                            style={{ ...S.select, cursor: locked ? 'not-allowed' : 'pointer' }}
                        >
                            <option value="Incomplete">Incomplete</option>
                            <option value="Fulfilled">Fulfilled</option>
                        </select>
                    </div>
                    <div>
                        <div style={{ ...S.statLabel, fontSize: '0.75rem' }}>Payment</div>
                        <select
                            value={item.payment_status}
                            disabled={saving || locked}
                            onChange={(e) => onUpdate(kind, item.id, { payment_status: e.target.value })}
                            style={{ ...S.select, cursor: locked ? 'not-allowed' : 'pointer' }}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <div style={{ ...S.statLabel, fontSize: '0.75rem' }}>Price (Ksh)</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                                type="text"
                                value={priceDraft}
                                disabled={locked}
                                onChange={(e) => onPriceChange(e.target.value.replace(/\D/g, ''))}
                                style={{ ...S.select, width: '110px', cursor: locked ? 'not-allowed' : 'text' }}
                            />
                            <button onClick={() => onSavePrice(kind, item.id, priceDraft)} disabled={saving || locked} style={S.goldBtn}>
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                        <div style={{ ...S.sub, marginTop: '6px' }}>
                            {item.price_set ? `Current: ${formatKsh(parseAmount(item.price))}` : 'Price not yet confirmed'}
                        </div>
                    </div>
                </div>

                {/* Situation updates: only available once the request has been read */}
                {!locked && (
                    <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${C.border}` }}>
                        <div style={{ ...S.statLabel, fontSize: '0.75rem' }}>Service Updates</div>
                        <div style={{ ...S.sub, marginBottom: '12px' }}>
                            {lastUpdate
                                ? `Last update: ${fmtDateTime(lastUpdate.at)} by ${lastUpdate.author}`
                                : 'No updates yet. Add a note each day to keep track of progress.'}
                        </div>

                        {updates.length > 0 && (
                            <div style={{ maxHeight: '170px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                                {[...updates].reverse().map((u, i) => (
                                    <div key={i} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '10px 12px' }}>
                                        <div style={S.sub}>{fmtDateTime(u.at)} · {u.author}</div>
                                        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: '4px', color: C.text, fontSize: '0.9rem' }}>{u.text}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <textarea
                            rows={3}
                            maxLength={2000}
                            value={noteDraft}
                            onChange={(e) => setNoteDraft(e.target.value)}
                            placeholder="Today's situation: what has been done, what is pending, next steps..."
                            style={{ width: '100%', boxSizing: 'border-box', background: C.bg, color: C.text, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '10px 12px', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <button onClick={submitNote} disabled={saving || !noteDraft.trim()} style={{ ...S.goldBtn, opacity: !noteDraft.trim() ? 0.5 : 1 }}>
                                {saving ? 'Saving...' : 'Add Update'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ---------- main component ---------- */

export default function AdminDashboard() {
    const [data, setData] = useState({ enrollments: [], contacts: [], diplomats: [], activity_logs: [] });
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [activeTab, setActiveTab] = useState('contacts');
    const [serviceFilter, setServiceFilter] = useState('All');
    const [fulfillmentFilter, setFulfillmentFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [username, setUsername] = useState('Admin');

    const [priceDrafts, setPriceDrafts] = useState({});
    const [savingKey, setSavingKey] = useState(null);
    const [selected, setSelected] = useState(null); // { kind: 'contacts' | 'diplomats', id }
    const [notice, setNotice] = useState(null);
    const [dismissedSig, setDismissedSig] = useState('');
    const [now, setNow] = useState(() => Date.now());
    const [navHidden, setNavHidden] = useState(false);

    const [placeholderIdx, setPlaceholderIdx] = useState(0);
    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

    const navigate = useNavigate();

    const flash = (type, text) => setNotice({ type, text });

    const fetchDashboardData = useCallback(async () => {
        if (!localStorage.getItem('access_token')) {
            navigate('/admin/login');
            return;
        }
        try {
            const res = await axios.get(`${API_URL}/api/admin/dashboard-data/`, authConfig());
            const resolvedUsername = res.data.username || 'Admin';
            setUsername(resolvedUsername);
            localStorage.setItem('username', resolvedUsername);
            setData({
                enrollments: res.data.enrollments || [],
                contacts: (res.data.contacts || []).map(c => normalizeInquiry('contacts', c)),
                diplomats: (res.data.diplomats || []).map(d => normalizeInquiry('diplomats', d)),
                activity_logs: res.data.activity_logs || []
            });
            setLoadError('');
        } catch (err) {
            console.error(err);
            if (isAuthError(err)) {
                clearSession();
                navigate('/admin/login');
            } else {
                setLoadError('Could not load dashboard data. Check that the backend is running, then retry.');
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);

    // Re-check the 24-hour "new arrival" window every minute, and pick up new requests every 2 minutes.
    useEffect(() => {
        const tick = setInterval(() => setNow(Date.now()), 60 * 1000);
        const poll = setInterval(fetchDashboardData, 2 * 60 * 1000);
        return () => { clearInterval(tick); clearInterval(poll); };
    }, [fetchDashboardData]);

    useEffect(() => {
        let inner;
        const timer = setInterval(() => {
            setIsPlaceholderVisible(false);
            inner = setTimeout(() => {
                setPlaceholderIdx((prev) => (prev + 1) % PLACEHOLDERS.length);
                setIsPlaceholderVisible(true);
            }, 300);
        }, 3500);
        return () => { clearInterval(timer); clearTimeout(inner); };
    }, []);

    useEffect(() => {
        if (!notice) return undefined;
        const t = setTimeout(() => setNotice(null), 4500);
        return () => clearTimeout(t);
    }, [notice]);

    useEffect(() => {
        if (!selected) return undefined;
        const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selected]);

    // The navbar hides while scrolling down and drops back as soon as the admin scrolls up,
    // even mid-page. The footer is shown only while the navbar is hidden, never together.
    useEffect(() => {
        let lastY = window.scrollY;
        let acc = 0;
        const onScroll = () => {
            const y = window.scrollY;
            const delta = y - lastY;
            lastY = y;
            if (y < 80) {
                setNavHidden(false);
                acc = 0;
                return;
            }
            // Accumulate movement in one direction; reset when the direction flips.
            acc = Math.sign(delta) === Math.sign(acc) ? acc + delta : delta;
            if (acc > 10) setNavHidden(true);
            else if (acc < -3) setNavHidden(false);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = () => {
        clearSession();
        navigate('/admin/login');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchQuery('');
        setServiceFilter('All');
        setFulfillmentFilter('All');
    };

    // Persists to the backend first; local state is only updated from the server's response.
    const updateInquiry = async (kind, id, payload) => {
        setSavingKey(`${kind}:${id}`);
        try {
            const res = await axios.patch(`${API_URL}/api/admin/${kind}/${id}/update/`, payload, authConfig());
            const saved = normalizeInquiry(kind, res.data.inquiry);
            setData(prev => ({ ...prev, [kind]: prev[kind].map(row => (row.id === id ? saved : row)) }));
            return true;
        } catch (err) {
            console.error(err);
            if (isAuthError(err)) {
                clearSession();
                navigate('/admin/login');
            } else {
                flash('error', err.response?.data?.error || 'Update failed. Nothing was saved.');
            }
            return false;
        } finally {
            setSavingKey(null);
        }
    };

    const setReadStatus = async (kind, id, value) => {
        const ok = await updateInquiry(kind, id, { is_read: value });
        if (ok) {
            flash('success', value
                ? 'Marked as read. Status, price and updates are now unlocked.'
                : 'Marked as unread. Status and price are locked again.');
        }
    };

    const addUpdate = async (kind, id, text) => {
        const ok = await updateInquiry(kind, id, { add_update: text });
        if (ok) flash('success', 'Update added.');
        return ok;
    };

    const savePrice = async (kind, id, rawValue) => {
        const result = validatePrice(rawValue);
        if (!result.valid) {
            flash('error', result.message);
            return;
        }
        const ok = await updateInquiry(kind, id, { price: result.formatted });
        if (ok) {
            setPriceDrafts(prev => {
                const next = { ...prev };
                delete next[`row:${kind}:${id}`];
                delete next[`modal:${kind}:${id}`];
                return next;
            });
            flash('success', `Price set to Ksh ${result.formatted}.`);
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: C.bg, color: C.gold, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>
                Loading Admin Oversight Panel...
            </div>
        );
    }

    if (loadError) {
        return (
            <div style={{ minHeight: '100vh', background: C.bg, color: C.text, display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                <p style={{ color: C.muted, margin: 0 }}>{loadError}</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={S.goldBtn} onClick={() => { setLoading(true); fetchDashboardData(); }}>Retry</button>
                    <button style={{ ...S.goldBtn, background: '#b91c1c', color: '#fff' }} onClick={handleLogout}>Logout</button>
                </div>
            </div>
        );
    }

    /* ----- derived values ----- */

    const enrollmentRevenue = data.enrollments
        .filter(e => e.payment_status === 'Completed')
        .reduce((sum, e) => sum + parseAmount(e.tuition_fee), 0);

    const countPayments = (status) => data.enrollments.filter(e => (e.payment_status || 'Pending') === status).length;
    const countFulfilled = (rows) => rows.filter(r => r.fulfillment_status === 'Fulfilled').length;
    const countUnread = (rows) => rows.filter(r => !r.is_read).length;

    const unreadContacts = countUnread(data.contacts);
    const unreadDiplomats = countUnread(data.diplomats);
    const newCount = data.contacts.filter(r => isNewArrival(r, now)).length
        + data.diplomats.filter(r => isNewArrival(r, now)).length;
    const bannerSig = `${newCount}:${unreadContacts + unreadDiplomats}`;
    const showBanner = unreadContacts + unreadDiplomats > 0 && dismissedSig !== bannerSig;

    const inquiryRows = activeTab === 'diplomats' ? data.diplomats : data.contacts;
    const serviceOptions = [...new Set(inquiryRows.map(r => r.service))].sort();

    const filterInquiries = (rows) => sortInquiries(rows.filter(item =>
        (serviceFilter === 'All' || item.service === serviceFilter) &&
        (fulfillmentFilter === 'All' || item.fulfillment_status === fulfillmentFilter) &&
        matches(searchQuery, item.name, item.email, item.phone, item.service, item.diplomatic_status, item.mission_or_country, dateText(item.created_at))
    ));

    const filteredContacts = filterInquiries(data.contacts);
    const filteredDiplomats = filterInquiries(data.diplomats);

    const filteredEnrollments = data.enrollments.filter(item =>
        matches(searchQuery, item.full_name, item.email, item.mpesa_phone_number, item.course_title, dateText(item.created_at))
    );

    const filteredLogs = data.activity_logs.filter(log =>
        matches(searchQuery, log.admin__username, log.action, log.ip_address, dateText(log.timestamp))
    );

    const selectedItem = selected ? data[selected.kind].find(r => r.id === selected.id) : null;

    const tabs = [
        { key: 'contacts', label: 'General Inquiries', count: data.contacts.length, unread: unreadContacts },
        { key: 'enrollments', label: 'Academy Enrollments', count: data.enrollments.length, unread: 0 },
        { key: 'diplomats', label: 'Diplomat Inquiries', count: data.diplomats.length, unread: unreadDiplomats },
        ...(username === 'dev' ? [{ key: 'traffic', label: 'Admin Traffic Logs', count: data.activity_logs.length, unread: 0 }] : [])
    ];

    const searchBox = (
        <SearchBox
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={PLACEHOLDERS[placeholderIdx]}
            visible={isPlaceholderVisible}
        />
    );

    // Filters + search shared by the General Inquiries and Diplomat Inquiries tabs.
    const inquiryToolbar = (
        <div style={S.toolbar}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                    <span style={{ color: C.muted, fontSize: '0.9rem', fontWeight: '500', marginRight: '8px' }}>Service:</span>
                    <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} style={S.select}>
                        <option value="All">All Services</option>
                        {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <span style={{ color: C.muted, fontSize: '0.9rem', fontWeight: '500', marginRight: '8px' }}>Status:</span>
                    <select value={fulfillmentFilter} onChange={(e) => setFulfillmentFilter(e.target.value)} style={S.select}>
                        <option value="All">All</option>
                        <option value="Fulfilled">Fulfilled</option>
                        <option value="Incomplete">Incomplete</option>
                    </select>
                </div>
            </div>
            {searchBox}
        </div>
    );

    const tableProps = {
        now,
        drafts: priceDrafts,
        setDrafts: setPriceDrafts,
        savingKey,
        onUpdate: updateInquiry,
        onSavePrice: savePrice,
        onLockedClick: () => flash('warn', LOCKED_MESSAGE)
    };

    return (
        <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>

            {notice && (
                <div style={{
                    position: 'fixed', top: '20px', right: '20px', zIndex: 2000, padding: '12px 18px', borderRadius: '8px', maxWidth: '360px',
                    background: noticeColor[notice.type] || noticeColor.success, color: '#fff', fontSize: '0.9rem', fontWeight: '500',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
                }}>
                    {notice.text}
                </div>
            )}

            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.panel, padding: '18px 30px',
                borderBottom: `1px solid ${C.border}`, marginBottom: '30px', flexWrap: 'wrap', gap: '15px',
                position: 'sticky', top: 0, zIndex: 50,
                transform: navHidden ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 0.3s ease'
            }}>
                <div style={{ display: 'flex', gap: '25px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => handleTabChange(tab.key)}
                            style={{ background: 'none', border: 'none', color: activeTab === tab.key ? C.gold : C.muted, cursor: 'pointer', fontWeight: '600', fontSize: '0.95rem', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                        >
                            {tab.label}
                            {tab.unread > 0 && (
                                <span style={{ background: '#b91c1c', color: '#fff', borderRadius: '999px', fontSize: '0.7rem', padding: '2px 8px', fontWeight: '700' }}>
                                    {tab.unread} unread
                                </span>
                            )}
                        </button>
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ color: C.text, fontWeight: '600', fontSize: '0.9rem', display: 'block' }}>Administrator: {username}</span>
                        <span style={{ color: C.gold, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FKC Management Portal</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{ padding: '8px 16px', background: '#b91c1c', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: '1300px', width: '100%', boxSizing: 'border-box', flex: 1, margin: '0 auto', padding: '0 20px 90px 20px' }}>

                {showBanner && (
                    <NewArrivalsBanner
                        newCount={newCount}
                        unreadContacts={unreadContacts}
                        unreadDiplomats={unreadDiplomats}
                        onGo={handleTabChange}
                        onDismiss={() => setDismissedSig(bannerSig)}
                    />
                )}

                {activeTab === 'contacts' && (
                    <>
                        <div style={S.statGrid}>
                            <StatCard label="Total Inquiries" value={data.contacts.length} />
                            <StatCard label="Unread" value={unreadContacts} gold={unreadContacts > 0} />
                            <StatCard label="Fulfilled" value={countFulfilled(data.contacts)} />
                            <StatCard label="Inquiry Revenue" value={formatKsh(inquiryRevenue(data.contacts))} gold />
                        </div>
                        {inquiryToolbar}
                        <InquiryTable
                            kind="contacts"
                            rows={filteredContacts}
                            emptyText="No inquiries found matching your criteria."
                            openLabel="Details"
                            onOpen={(id) => setSelected({ kind: 'contacts', id })}
                            {...tableProps}
                        />
                    </>
                )}

                {activeTab === 'enrollments' && (
                    <>
                        <div style={S.statGrid}>
                            <StatCard label="Pending Payments" value={countPayments('Pending')} />
                            <StatCard label="Completed Payments" value={countPayments('Completed')} />
                            <StatCard label="Failed Payments" value={countPayments('Failed')} />
                            <StatCard label="Enrollment Revenue" value={formatKsh(enrollmentRevenue)} gold />
                        </div>

                        <div style={S.toolbar}>
                            <h3 style={{ color: C.gold, fontSize: '1.2rem', margin: 0, fontWeight: '600' }}>Student Information</h3>
                            {searchBox}
                        </div>

                        <DataTable
                            headers={['Student Name', 'Email / Phone Number', 'Selected Course', 'Fee Payment Status', 'Date']}
                            isEmpty={filteredEnrollments.length === 0}
                            emptyText="No student enrollments found matching your search."
                        >
                            {filteredEnrollments.map(item => {
                                const fee = parseAmount(item.tuition_fee);
                                return (
                                    <tr key={item.id} style={S.row}>
                                        <td style={{ ...S.td, fontWeight: '500' }}>
                                            {item.full_name}
                                            {item.age ? <div style={S.sub}>Age {item.age}</div> : null}
                                        </td>
                                        <td style={{ ...S.td, color: C.muted }}>
                                            <div>{item.email || 'No Email'}</div>
                                            <div style={S.sub}>{item.mpesa_phone_number || 'No Phone Number Registered'}</div>
                                        </td>
                                        <td style={{ ...S.td, color: C.gold }}>
                                            {item.course_title}
                                            <div style={S.sub}>{fee > 0 ? formatKsh(fee) : 'Fee not set'} · {item.payment_method}</div>
                                        </td>
                                        <td style={S.td}>
                                            <Badge color={paymentColor(item.payment_status)}>{item.payment_status || 'Pending'}</Badge>
                                        </td>
                                        <DateCell value={item.created_at} />
                                    </tr>
                                );
                            })}
                        </DataTable>
                    </>
                )}

                {activeTab === 'diplomats' && (
                    <>
                        <div style={S.statGrid}>
                            <StatCard label="Diplomat Inquiries" value={data.diplomats.length} />
                            <StatCard label="Unread" value={unreadDiplomats} gold={unreadDiplomats > 0} />
                            <StatCard label="Fulfilled" value={countFulfilled(data.diplomats)} />
                            <StatCard label="Diplomat Revenue" value={formatKsh(inquiryRevenue(data.diplomats))} gold />
                        </div>
                        {inquiryToolbar}
                        <InquiryTable
                            kind="diplomats"
                            rows={filteredDiplomats}
                            emptyText="No diplomat inquiries found matching your criteria."
                            openLabel="Details"
                            onOpen={(id) => setSelected({ kind: 'diplomats', id })}
                            {...tableProps}
                        />
                    </>
                )}

                {activeTab === 'traffic' && username === 'dev' && (
                    <>
                        <div style={S.toolbar}>
                            <h3 style={{ color: C.gold, fontSize: '1.2rem', margin: 0, fontWeight: '600' }}>Admin Traffic & Activity Logs</h3>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <SearchBox
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    placeholder="Search by admin username, action, IP or date..."
                                    visible
                                />
                                <button style={S.goldBtn} onClick={fetchDashboardData}>Refresh</button>
                            </div>
                        </div>
                        <DataTable
                            headers={['Admin Username', 'Action Performed', 'IP Address', 'Timestamp']}
                            isEmpty={filteredLogs.length === 0}
                            emptyText={data.activity_logs.length === 0 ? 'No activity logs recorded yet.' : 'No activity logs match your search.'}
                        >
                            {filteredLogs.map((log, idx) => (
                                <tr key={idx} style={S.row}>
                                    <td style={{ ...S.td, fontWeight: '600', color: C.gold }}>
                                        <span
                                            title={log.is_active ? 'Active in the last 3 minutes' : 'Inactive'}
                                            style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px', background: log.is_active ? '#22c55e' : '#475569' }}
                                        />
                                        {log.admin__username}
                                    </td>
                                    <td style={{ ...S.td, color: C.text }}>{log.action}</td>
                                    <td style={{ ...S.td, color: C.muted }}>{log.ip_address || '—'}</td>
                                    <DateCell value={log.timestamp} />
                                </tr>
                            ))}
                        </DataTable>
                    </>
                )}
            </div>

            <AdminFooter visible={navHidden} />

            {selectedItem && (
                <InquiryModal
                    key={`${selected.kind}:${selectedItem.id}`}
                    kind={selected.kind}
                    item={selectedItem}
                    priceDraft={priceDrafts[`modal:${selected.kind}:${selectedItem.id}`] ?? digitsOf(selectedItem.price)}
                    onPriceChange={(v) => setPriceDrafts(prev => ({ ...prev, [`modal:${selected.kind}:${selectedItem.id}`]: v }))}
                    onSavePrice={savePrice}
                    onUpdate={updateInquiry}
                    onSetRead={setReadStatus}
                    onAddUpdate={addUpdate}
                    onClose={() => setSelected(null)}
                    saving={savingKey === `${selected.kind}:${selectedItem.id}`}
                />
            )}
        </div>
    );
}
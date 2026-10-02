import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const MIN_PRICE = 1000;
const DEFAULT_SERVICES = { contacts: 'General Contact Inquiry', diplomats: 'Diplomatic Inquiry' };

const PLACEHOLDERS = [
    'Search by client name...',
    'Search by email address...',
    'Search by phone number...',
    'Search by service or course...',
    'Search by date (e.g. 2026-10-02)...'
];

const C = {
    bg: '#0b0f19', panel: '#111827', border: '#1f2937', gold: '#b29051',
    text: '#f3f4f6', muted: '#94a3b8', faint: '#64748b'
};

const S = {
    card: { background: C.panel, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '20px' },
    statLabel: { color: C.muted, fontSize: '0.85rem', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '0.05em' },
    statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' },
    tableWrap: { background: C.panel, border: `1px solid ${C.border}`, borderRadius: '10px', overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' },
    headRow: { background: C.border, color: C.gold, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
    th: { padding: '15px 20px' },
    td: { padding: '15px 20px' },
    row: { borderBottom: `1px solid ${C.border}` },
    select: { background: C.panel, color: C.text, border: `1px solid ${C.border}`, padding: '8px 12px', borderRadius: '6px', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' },
    cellSelect: { background: C.border, color: '#93c5fd', border: '1px solid #374151', padding: '6px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', width: '130px', boxSizing: 'border-box' },
    goldBtn: { padding: '8px 16px', background: C.gold, color: C.bg, border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' },
    toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '15px', flexWrap: 'wrap' },
    sub: { fontSize: '0.8rem', color: C.faint }
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

const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : '—');
const fmtTime = (d) => (d ? new Date(d).toLocaleTimeString() : '');
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
    price_set: Boolean(c.price_set)
});

const paymentColor = (status) => {
    if (status === 'Completed') return '#065f46';
    if (status === 'Failed') return '#991b1b';
    return '#854d0e';
};

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

// One table for both General Inquiries and Diplomat Inquiries.
function InquiryTable({ kind, rows, emptyText, openLabel, drafts, setDrafts, savingKey, onUpdate, onSavePrice, onOpen }) {
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
                const extra = kind === 'diplomats'
                    ? [item.diplomatic_status, item.mission_or_country].filter(Boolean).join(' · ')
                    : '';
                return (
                    <tr key={item.id} style={{ ...S.row, opacity: rowSaving ? 0.6 : 1 }}>
                        <td style={{ ...S.td, fontWeight: '500' }}>{item.name}</td>
                        <td style={{ ...S.td, color: C.muted }}>
                            <div>{item.email || 'No Email'}</div>
                            <div style={S.sub}>{item.phone || 'No Phone Number Registered'}</div>
                        </td>
                        <td style={{ ...S.td, color: C.gold }}>
                            {item.service}
                            {extra && <div style={S.sub}>{extra}</div>}
                        </td>
                        <td style={S.td}>
                            <select
                                value={item.fulfillment_status}
                                disabled={rowSaving}
                                onChange={(e) => onUpdate(kind, item.id, { fulfillment_status: e.target.value })}
                                style={{ background: item.fulfillment_status === 'Fulfilled' ? '#065f46' : '#854d0e', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}
                            >
                                <option value="Incomplete" style={{ background: C.panel, color: '#fff' }}>Incomplete</option>
                                <option value="Fulfilled" style={{ background: C.panel, color: '#fff' }}>Fulfilled</option>
                            </select>
                        </td>
                        <td style={S.td}>
                            <select
                                value={item.payment_status}
                                disabled={rowSaving}
                                onChange={(e) => onUpdate(kind, item.id, { payment_status: e.target.value })}
                                style={S.cellSelect}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </td>
                        <td style={S.td}>
                            {!item.price_set ? (
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        value={draft}
                                        disabled={rowSaving}
                                        onChange={(e) => setDrafts(prev => ({ ...prev, [draftKey]: e.target.value.replace(/\D/g, '') }))}
                                        style={{ width: '70px', background: C.border, color: '#fff', border: '1px solid #374151', borderRadius: '4px', padding: '6px 8px', fontSize: '0.8rem' }}
                                        placeholder="1000"
                                    />
                                    <button
                                        onClick={() => onSavePrice(kind, item.id, draft)}
                                        disabled={rowSaving}
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

function InquiryModal({ kind, item, priceDraft, onPriceChange, onSavePrice, onUpdate, onClose, saving }) {
    const [closeHover, setCloseHover] = useState(false);
    const isDiplomat = kind === 'diplomats';
    const cell = (label, value, extraStyle = {}) => (
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '12px 14px', ...extraStyle }}>
            <div style={{ ...S.statLabel, fontSize: '0.75rem', marginBottom: '6px' }}>{label}</div>
            <div style={{ color: C.text, wordBreak: 'break-word' }}>{value || '—'}</div>
        </div>
    );
    const grid = { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px', marginBottom: '12px' };

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
                    {cell('Service Requested At', `${fmtDate(item.created_at)} ${fmtTime(item.created_at)}`)}
                    {cell(
                        'Fulfilled At',
                        item.fulfilled_at ? `${fmtDate(item.fulfilled_at)} ${fmtTime(item.fulfilled_at)}` : 'Not yet fulfilled'
                    )}
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${C.border}` }}>
                    <div>
                        <div style={{ ...S.statLabel, fontSize: '0.75rem' }}>Status</div>
                        <select
                            value={item.fulfillment_status}
                            disabled={saving}
                            onChange={(e) => onUpdate(kind, item.id, { fulfillment_status: e.target.value })}
                            style={S.select}
                        >
                            <option value="Incomplete">Incomplete</option>
                            <option value="Fulfilled">Fulfilled</option>
                        </select>
                    </div>
                    <div>
                        <div style={{ ...S.statLabel, fontSize: '0.75rem' }}>Payment</div>
                        <select
                            value={item.payment_status}
                            disabled={saving}
                            onChange={(e) => onUpdate(kind, item.id, { payment_status: e.target.value })}
                            style={S.select}
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
                                onChange={(e) => onPriceChange(e.target.value.replace(/\D/g, ''))}
                                style={{ ...S.select, width: '110px', cursor: 'text' }}
                            />
                            <button onClick={() => onSavePrice(kind, item.id, priceDraft)} disabled={saving} style={S.goldBtn}>
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                        <div style={{ ...S.sub, marginTop: '6px' }}>
                            {item.price_set ? `Current: ${formatKsh(parseAmount(item.price))}` : 'Price not yet confirmed'}
                        </div>
                    </div>
                </div>
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
        const t = setTimeout(() => setNotice(null), 4000);
        return () => clearTimeout(t);
    }, [notice]);

    useEffect(() => {
        if (!selected) return undefined;
        const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selected]);

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

    const inquiryRows = activeTab === 'diplomats' ? data.diplomats : data.contacts;
    const serviceOptions = [...new Set(inquiryRows.map(r => r.service))].sort();

    const filterInquiries = (rows) => rows.filter(item =>
        (serviceFilter === 'All' || item.service === serviceFilter) &&
        (fulfillmentFilter === 'All' || item.fulfillment_status === fulfillmentFilter) &&
        matches(searchQuery, item.name, item.email, item.phone, item.service, item.diplomatic_status, item.mission_or_country, dateText(item.created_at))
    );

    const filteredContacts = filterInquiries(data.contacts);
    const filteredDiplomats = filterInquiries(data.diplomats);

    const filteredEnrollments = data.enrollments.filter(item =>
        matches(searchQuery, item.full_name, item.email, item.mpesa_phone_number, item.course_title, dateText(item.created_at))
    );

    const selectedItem = selected ? data[selected.kind].find(r => r.id === selected.id) : null;

    const tabs = [
        { key: 'contacts', label: 'General Inquiries', count: data.contacts.length },
        { key: 'enrollments', label: 'Academy Enrollments', count: data.enrollments.length },
        { key: 'diplomats', label: 'Diplomat Inquiries', count: data.diplomats.length },
        ...(username === 'dev' ? [{ key: 'traffic', label: 'Admin Traffic Logs', count: data.activity_logs.length }] : [])
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
        drafts: priceDrafts,
        setDrafts: setPriceDrafts,
        savingKey,
        onUpdate: updateInquiry,
        onSavePrice: savePrice
    };

    return (
        <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: 'Inter, sans-serif' }}>

            {notice && (
                <div style={{
                    position: 'fixed', top: '20px', right: '20px', zIndex: 2000, padding: '12px 18px', borderRadius: '8px',
                    background: notice.type === 'error' ? '#7f1d1d' : '#065f46', color: '#fff', fontSize: '0.9rem', fontWeight: '500',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
                }}>
                    {notice.text}
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.panel, padding: '18px 30px', borderBottom: `1px solid ${C.border}`, marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '25px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => handleTabChange(tab.key)}
                            style={{ background: 'none', border: 'none', color: activeTab === tab.key ? C.gold : C.muted, cursor: 'pointer', fontWeight: '600', fontSize: '0.95rem', padding: 0 }}
                        >
                            {tab.label} ({tab.count})
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

            <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px 40px 20px' }}>

                {activeTab === 'contacts' && (
                    <>
                        <div style={S.statGrid}>
                            <StatCard label="Total Inquiries" value={data.contacts.length} />
                            <StatCard label="Fulfilled" value={countFulfilled(data.contacts)} />
                            <StatCard label="Inquiry Revenue" value={formatKsh(inquiryRevenue(data.contacts))} gold />
                        </div>
                        {inquiryToolbar}
                        <InquiryTable
                            kind="contacts"
                            rows={filteredContacts}
                            emptyText="No inquiries found matching your criteria."
                            openLabel="Dive"
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
                            <button style={S.goldBtn} onClick={fetchDashboardData}>Refresh</button>
                        </div>
                        <DataTable
                            headers={['Admin Username', 'Action Performed', 'IP Address', 'Timestamp']}
                            isEmpty={data.activity_logs.length === 0}
                            emptyText="No activity logs recorded yet."
                        >
                            {data.activity_logs.map((log, idx) => (
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

            {selectedItem && (
                <InquiryModal
                    kind={selected.kind}
                    item={selectedItem}
                    priceDraft={priceDrafts[`modal:${selected.kind}:${selectedItem.id}`] ?? digitsOf(selectedItem.price)}
                    onPriceChange={(v) => setPriceDrafts(prev => ({ ...prev, [`modal:${selected.kind}:${selectedItem.id}`]: v }))}
                    onSavePrice={savePrice}
                    onUpdate={updateInquiry}
                    onClose={() => setSelected(null)}
                    saving={savingKey === `${selected.kind}:${selectedItem.id}`}
                />
            )}
        </div>
    );
}
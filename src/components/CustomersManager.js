import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import Header from './Header';

const CustomersManager = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/customers', { withCredentials: true });
      setCustomers(res.data);
    } catch (err) {
      alert('Failed to fetch customers');
    }
  };

  const handleUpdate = async (id, currentData) => {
    const name = prompt('Name:', currentData.name);
    const email = prompt('Email:', currentData.email);
    const phone = prompt('Phone (10 digits):', currentData.phone);
    const account_status = prompt('Status (active/inactive):', currentData.account_status);
    const balance = parseFloat(prompt('Balance:', currentData.balance));

    const updated = { name, email, phone, account_status, balance };
    try {
      await axios.patch(`http://localhost:5000/customers/${id}`, updated, { withCredentials: true });
      fetchCustomers();
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:5000/customers/${id}`, { withCredentials: true });
        fetchCustomers();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', paddingBottom: '40px' }}>
      <Header />

      <div style={{
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '600',
          textAlign: 'center',
          color: '#1c3c70',
          marginBottom: '30px',
          letterSpacing: '0.5px'
        }}>
          Customer Financial Report
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            fontSize: '14px',
            color: '#333',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#e8edf3', color: '#1c3c70', textTransform: 'uppercase' }}>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Status</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Balance (USD)</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, index) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #ddd', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#f0f4fa'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{c.name}</td>
                  <td style={tdStyle}>{c.email}</td>
                  <td style={tdStyle}>{c.phone}</td>
                  <td style={{ ...tdStyle, textTransform: 'capitalize' }}>{c.account_status}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontWeight: '600', color: '#0f5132' }}>${c.balance.toFixed(2)}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button onClick={() => handleUpdate(c.id, c)} style={iconBtn} title="Edit">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(c.id)} style={{ ...iconBtn, color: '#e3342f' }} title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#777', fontStyle: 'italic' }}>
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Common styles
const thStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: '600',
  fontSize: '12px',
  borderBottom: '1px solid #ddd'
};

const tdStyle = {
  padding: '14px 16px',
  verticalAlign: 'top'
};

const iconBtn = {
  margin: '0 5px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#1c3c70'
};

export default CustomersManager;

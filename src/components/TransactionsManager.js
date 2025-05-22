import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const TransactionsManager = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/transactions", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }
        return res.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch(() => {
        alert("Failed to fetch transactions");
      });
  }, []);

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
          All Transactions
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            fontSize: '14px',
            color: '#333',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#f9fafb',
                textTransform: 'uppercase',
                color: '#666',
                fontSize: '12px',
                letterSpacing: '0.5px',
                borderBottom: '1px solid #ddd'
              }}>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Amount (USD)</th>
                <th style={thStyle}>Timestamp</th>
                <th style={thStyle}>Customer Name</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <tr key={t.id} style={{
                  borderBottom: '1px solid #e0e0e0',
                  transition: 'background 0.2s'
                }}
                  onMouseOver={e => e.currentTarget.style.background = '#f0f4fa'}
                  onMouseOut={e => e.currentTarget.style.background = 'white'}
                >
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={{ ...tdStyle, textTransform: 'capitalize' }}>{t.type}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', color: '#0f5132', fontWeight: '600' }}>${t.amount.toFixed(2)}</td>
                  <td style={tdStyle}>{new Date(t.timestamp).toLocaleString()}</td>
                  <td style={tdStyle}>{t.customer_name}</td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="5" style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#777',
                    fontStyle: 'italic'
                  }}>
                    No transactions found.
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

export default TransactionsManager;

//admin
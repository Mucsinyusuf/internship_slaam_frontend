import React, { useState } from 'react';
import Header from './Header';

const CreateCustomer = () => {
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    account_status: 'active',
    balance: 0,
  });

  const handleCreate = () => {
    const { name, email, phone } = newCustomer;
    if (!name || !email || !phone) return alert('Please fill all fields');
    if (!/^\S+@\S+\.\S+$/.test(email)) return alert('Enter a valid email');
    if (!/^\d{10}$/.test(phone)) return alert('Phone must be 10 digits');

    fetch('http://localhost:5000/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(newCustomer),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || 'Creation failed');
          });
        }
        return res.json();
      })
      .then(() => {
        alert('Customer created successfully!');
        setNewCustomer({ name: '', email: '', phone: '', account_status: 'active', balance: 0 });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h2 className="login-title">Create Customer</h2>
        <div className="input-group">
          <label className="input-label">Name</label>
          <input
            className="input-field"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            className="input-field"
            type="email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Phone</label>
          <input
            className="input-field"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Account Status</label>
          <select
            className="input-field"
            value={newCustomer.account_status}
            onChange={(e) => setNewCustomer({ ...newCustomer, account_status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="input-group">
          <label className="input-label">Balance</label>
          <input
            className="input-field"
            type="number"
            value={newCustomer.balance}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, balance: parseFloat(e.target.value || 0) })
            }
          />
        </div>
        <button className="login-button" onClick={handleCreate}>
          Create Customer
        </button>
      </div>
    </>
  );
};

export default CreateCustomer;
//admin
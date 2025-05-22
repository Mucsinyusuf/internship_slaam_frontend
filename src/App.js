<<<<<<< HEAD
import React, { useState } from 'react';
import './App.css';
import AdminLogin from './components/AdminLogin';

function App() {
  // am define state and setter here
  const [, setUser] = useState(null);

  return (
    <div>
     
      <AdminLogin setUser={setUser} />
    </div>
=======
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import CustomersManager from "./components/CustomersManager";
import TransactionsManager from "./components/TransactionsManager";
import CreateCustomer from "./components/CreateCustomer";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<AdminLogin setUser={setUser} />} />
        <Route path="/customers" element={<CustomersManager />} />
        <Route path="/addcustomers" element={<CreateCustomer/>}/>
        <Route path="/transactions" element={<TransactionsManager/>} />
      </Routes>
    </Router>
>>>>>>> 0f86c38 (tested frontend)
  );
}

export default App;

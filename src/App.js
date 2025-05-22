import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import CustomersManager from "./components/CustomersManager";
import TransactionsManager from "./components/TransactionsManager";
import CreateCustomer from "./components/CreateCustomer";
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin setUser={setUser} />} />
        <Route path="/customers" element={<CustomersManager />} />
        <Route path="/addcustomers" element={<CreateCustomer />} />
        <Route path="/transactions" element={<TransactionsManager />} />
      </Routes>
    </Router>
  );
}

export default App;

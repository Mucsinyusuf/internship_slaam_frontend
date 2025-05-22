import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ No BrowserRouter here
import AdminLogin from "./components/AdminLogin";
import CustomersManager from "./components/CustomersManager";
import TransactionsManager from "./components/TransactionsManager";
import CreateCustomer from "./components/CreateCustomer";
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<AdminLogin setUser={setUser} />} />
      <Route path="/customers" element={<CustomersManager />} />
      <Route path="/addcustomers" element={<CreateCustomer />} />
      <Route path="/transactions" element={<TransactionsManager />} />
    </Routes>
  );
}

export default App;

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
  );
}

export default App;

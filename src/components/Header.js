import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/admin/logout", {}, { withCredentials: true });
      alert("Logged out successfully");
      navigate("/");
    } catch (err) {
      alert("Logout failed");
    }
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: '#1c3c70',
    fontWeight: '600',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(28, 60, 112, 0.25)',
    transition: 'background-color 0.3s ease',
    marginLeft: '12px',  // margin left for spacing when aligned right
    fontFamily: "'Poppins', sans-serif",
    fontSize: '14px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#e8ecf5',
  };

  const logoutButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    fontWeight: '600',
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(220, 53, 69, 0.6)',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
    marginLeft: '20px',  // space before logout
  };

  const logoutHoverStyle = {
    backgroundColor: '#b02a37',
  };

  const [hoveredBtn, setHoveredBtn] = React.useState(null);
  const [hoveredLogout, setHoveredLogout] = React.useState(false);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',  // Align everything to the right
        alignItems: 'center',
        backgroundColor: '#1c3c70',
        padding: '16px 32px',
        borderRadius: '12px',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div>
        {['/customers', '/transactions', '/addcustomers'].map((path, i) => {
          const labels = ['Customers', 'Transactions', 'Add Customers'];
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={hoveredBtn === i ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
              onMouseEnter={() => setHoveredBtn(i)}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              {labels[i]}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleLogout}
        style={hoveredLogout ? { ...logoutButtonStyle, ...logoutHoverStyle } : logoutButtonStyle}
        onMouseEnter={() => setHoveredLogout(true)}
        onMouseLeave={() => setHoveredLogout(false)}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;

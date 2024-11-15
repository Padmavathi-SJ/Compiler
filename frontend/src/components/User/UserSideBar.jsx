import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../App.css';
import '../../css/User/UserSidebar.css'; // Ensure correct casing
import { FaHome, FaCalendarAlt, FaClipboardList, FaCheckCircle, FaSignOutAlt, FaEdit } from 'react-icons/fa'; // Importing icons

const UserSideBar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://localhost:5000/api/logout', {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
    })
      .then(response => {
        if (response.ok) {
          if (typeof onLogout === 'function') {
            onLogout();
          }
          navigate('/login'); // Redirect to the login page after successful logout
        } else {
          console.error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <div className="sidebar">
      {/* Header with Logo and Heading */}
      <div className="sidebar-header">
        <img src="/images/compiler.png" alt="Logo" className="sidebar-logo" />
        <h2 className="sidebar-title">Compile-Run</h2>
      </div>

      {/* Navigation Links */}
      <ul className="sidebar-nav">
        <li>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            aria-label="Dashboard"
            title="Dashboard"
          >
            <FaHome className="nav-icon" />
            <span className="nav-text">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/upcoming" 
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            aria-label="Upcoming Tests"
            title="Upcoming Tests"
          >
            <FaCalendarAlt className="nav-icon" />
            <span className="nav-text">Upcoming Tests</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/tests" 
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            aria-label="OnGoing Tests"
            title="OnGoing Tests"
          >
            <FaClipboardList className="nav-icon" />
            <span className="nav-text">OnGoing</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/attended" 
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            aria-label="Attended Tests"
            title="Attended Tests"
          >
            <FaCheckCircle className="nav-icon" />
            <span className="nav-text">Attended</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/update-details" 
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            aria-label="Update Details"
            title="Update Details"
          >
            <FaEdit className="nav-icon" />
            <span className="nav-text">Update Details</span>
          </NavLink>
        </li>
      </ul>

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout} aria-label="Logout" title="Logout">
        <FaSignOutAlt className="logout-icon" />
        <span className="logout-text">Logout</span>
      </button>
    </div>
  );
};

export default UserSideBar;

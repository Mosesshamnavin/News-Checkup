import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css"; // Import CSS file for styling

const AdminLayout = () => {
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/edit-website">Edit Website</Link></li>
          <li><Link to="/write-news">Write News</Link></li>
          <li><Link to="/ads">Ads</Link></li>
          <li><Link to="/manage-users">Manage Users</Link></li>
          <li><Link to="/hostinger">Hostinger</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <Outlet /> {/* This will render the nested pages */}
      </div>
    </div>
  );
};

export default AdminLayout;

import React from 'react';
import { useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <a href="/dashboard.html" className={`nav-item ${isActive('/dashboard.html') ? 'active' : ''}`}>
        <i className="fas fa-home"></i>
        <span>Dashboard</span>
      </a>
      <a href="/chat.html" className={`nav-item ${isActive('/chat.html') ? 'active' : ''}`}>
        <i className="fas fa-robot"></i>
        <span>AI Assistant</span>
      </a>
      <a href="#" className="nav-item">
        <i className="fas fa-file-alt"></i>
        <span>Input Data</span>
      </a>
      <a href="#" className="nav-item">
        <i className="fas fa-chart-line"></i>
        <span>Monitoring</span>
      </a>
      <a href="#" className="nav-item">
        <i className="fas fa-user"></i>
        <span>Profil</span>
      </a>
    </nav>
  );
};

export default BottomNav;

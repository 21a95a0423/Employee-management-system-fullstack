import React from "react";
import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <header className="site-header sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
        <div className="container d-flex align-items-center">
          <NavLink className="navbar-brand site-logo fs-4" to="/">
            <span>
              <span style={{display:'block',lineHeight:1,fontWeight:700}}>Employee</span>
              <small style={{display:'block',fontSize:12,color:'var(--muted)', fontWeight:500}}>Management System</small>
            </span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link px-3 py-2 rounded ${isActive ? 'text-primary fw-bold' : 'text-muted fw-semibold'}`} to="/employees">
                  Employees
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link px-3 py-2 rounded ${isActive ? 'text-primary fw-bold' : 'text-muted fw-semibold'}`} to="/add-employee">
                  Add Employee
                </NavLink>
              </li>
              <li className="nav-item d-none d-lg-block ms-2">
                <a className="nav-link px-3 py-2 rounded text-muted fw-semibold" href="#contact">Contact</a>
              </li>
              <li className="nav-item ms-2">
                <button className="btn btn-outline-primary btn-sm rounded-pill">Sign in</button>
              </li>
              <li className="nav-item d-lg-none mt-2">
                <a className="nav-link text-muted" href="#about">About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
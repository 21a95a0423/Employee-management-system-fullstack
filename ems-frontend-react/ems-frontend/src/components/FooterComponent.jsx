import React from "react";
import './FooterComponent.css';

const FooterComponent = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="app-footer bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Employee Management</h6>
            <h4 className="small">A simple app to manage employees — create, update, and remove employee records.</h4>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="/employees">Employees</a></li>
              <li><a href="/add-employee">Add Employee</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contact</h6>
            <h5 className="small mb-1">Email: ramadabala30@gmail.com</h5>
            <h5 className="small">Phone: +91 6304493800</h5>
          </div>
        </div>

        <div className="text-center mt-3 small">© {year} Employee Management System developed by Rambabu Adabala</div>
      </div>
    </footer>
  );
};

export default FooterComponent;
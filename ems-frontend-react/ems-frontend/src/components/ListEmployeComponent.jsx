
import React, {useEffect, useState} from "react";
import { Listemployees } from "../service/EmployeService";
import { useNavigate , useParams} from "react-router-dom";
import EmployeeComponent from "./EmployeeComponent";
import { deleteEmployee } from "../service/EmployeService";

const ListEmployeComponent = ()=>{

  const [employees,setemployees]=useState([]);
  const navigator = useNavigate();

  useEffect(()=>{
    getAllEmployees();
  },[])

  function getAllEmployees(){
    Listemployees().then((Response)=>{
      setemployees(Response.data);
    }).catch(error=>{
      console.log(error)
    })
  }

  function addNewEmployee(){
    navigator('/add-employee')
  }

  function updateEmployee(id){
    navigator(`/edit-employee/${id}`)
  }

  function removeEmployee(id){
    deleteEmployee(id).then((Response)=>{
      window.alert('Employee deleted successfully');
      getAllEmployees();
    }).catch(error=>{
      console.error(error)
    })
  }
  
  return(
    <div className="container app-content">
      {/* Hero carousel */}
      <div id="homeCarousel" className="carousel slide mb-4 shadow-sm rounded" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80" className="d-block w-100 carousel-img" alt="office" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Manage your team effortlessly</h5>
              <p>Quickly add, update, and organize your employees.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=1400&q=80" className="d-block w-100 carousel-img" alt="meeting" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Stay organized</h5>
              <p>Keep employee records clean and accessible.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80" className="d-block w-100 carousel-img" alt="team" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Powerful and simple</h5>
              <p>Designed for teams of any size.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="d-flex align-items-center mb-3">
        <h2 className="text-start me-auto page-title">List of Employees</h2>
        <button type="button" className="btn btn-primary p-2 ms-auto" onClick={()=>addNewEmployee()}>Add Employee</button>
      </div>

      <div className="table-card">
        <table className="table table-custom table-hover align-middle">
          <thead>
            <tr>
              <th>EmployeeId</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            employees.map(employee=>(
              <tr key={employee.id} className="fade-in">
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td className="table-actions">
                  <button className="btn btn-info btn-sm me-2" onClick={()=>updateEmployee(employee.id)}>Update</button>
                  <button className="btn btn-danger btn-sm" onClick={()=>removeEmployee(employee.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
    </div>
  )
};export default ListEmployeComponent;
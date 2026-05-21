import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEmployee, getEmployee, updateEmployee } from "../service/EmployeService";


const EmployeeComponent = ()=>{

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors,seterrors]=useState({firstName:'',lastName:'',email:''});

  const { id } =useParams();
  const navigator = useNavigate(); 
  useEffect(()=>{
    if(id){
      getEmployee(id).then((Response)=>{
        setFirstname(Response.data.firstName);
        setLastName(Response.data.lastName);
        setEmail(Response.data.email);

      }).catch(error=>{
        console.error(error);
      })
    }

  },[id])

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    const employee = {firstName,lastName,email};
    if(validateForm()){
      if(id){
        updateEmployee(id, employee).then((response)=>{
          console.log(response.data)
          navigator('/employees')
        }).catch(error=>{
          console.log(error)
        })
       }
        else{
        // Replace your createEmployee() catch block in EmployeeComponent.jsx

createEmployee(employee)
  .then((response) => {
    navigator('/employees');
  })
  .catch((error) => {
    console.log(error);

    // Check if backend returned "Email already exists"
    if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      if (error.response.data.message === "Email already exists") {
        seterrors({
          ...errors,
          email: "Email already exists"
        });
      }
    }
  });
        }
      

      
    }
  }

  function validateForm(){
    let valid = true;

    const errorsCopy = { ...errors };

    if(!firstName.trim()){
      errorsCopy.firstName = "First name is required";
      valid = false;
    }else{
      errorsCopy.firstName = "";
    }

    if(!lastName.trim()){
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }else{
      errorsCopy.lastName = "";
    }

    if(!email.trim()){
      errorsCopy.email = "Email is required";
      valid = false;
    }else{
      // basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        errorsCopy.email = "Enter a valid email address";
        valid = false;
      }else{
        errorsCopy.email = "";
      }
    }

    seterrors(errorsCopy);
    return valid;
  }
  function addTitlepage(){
    if(id){
      return <h2 className="text-center m-3 page-title">Update <span className="brand-highlight">Employee</span></h2>
  }else
    return <h2 className="text-center m-3 page-title">Add <span className="brand-highlight">Employee</span></h2>

  }

  return(
    <div className="container app-content">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              {addTitlepage()}
            </div>
            <div className="card-body">
              <form onSubmit={saveOrUpdateEmployee} noValidate>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter Employee First Name"
                      name="firstName"
                      value={firstName}
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      onChange={(e)=>setFirstname(e.target.value)}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter Employee Last Name"
                      name="lastName"
                      value={lastName}
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      onChange={(e)=>setLastName(e.target.value)}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Employee Email"
                    name="email"
                    value={email}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={()=>navigator('/employees')}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
;

export default EmployeeComponent;
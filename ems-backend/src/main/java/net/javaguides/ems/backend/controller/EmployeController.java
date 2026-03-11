package net.javaguides.ems.backend.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.backend.dto.EmployeeDto;
import net.javaguides.ems.backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeController {
    private EmployeeService employeeService;
    //Build  Add  Employee  Rest API
@PostMapping()
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
       EmployeeDto savedEmployee =  employeeService.createEmployee(employeeDto);
       return  new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }
    //Build Get Employe By id
    @GetMapping("{employeeId}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable() Long employeeId){
    EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
    return ResponseEntity.ok(employeeDto);
    }
    //Build Get all employees
    @GetMapping()
    public ResponseEntity<List<EmployeeDto>>getAllEmployees(){
  List<EmployeeDto> employees =  employeeService.getAllEmployees();
  return ResponseEntity.ok(employees);
    }
    //Build Update Employees using employee Id ReSt api
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updatedEmployee(@PathVariable("id") Long employeeId,
                                                       @RequestBody EmployeeDto updatedEmployee){
    EmployeeDto employeeDto= employeeService.updateEmployee(employeeId, updatedEmployee);
    return ResponseEntity.ok(employeeDto);
    }

    //Build Delete employeById Rest Api;
    @DeleteMapping("{employeId}")
    public ResponseEntity<String> deleteEmployeById(@PathVariable Long employeId){
    employeeService.deleteEmployeById(employeId);
    return ResponseEntity.ok("Employee deleted Successfully! ");
    }

}


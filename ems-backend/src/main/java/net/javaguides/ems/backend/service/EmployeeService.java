package net.javaguides.ems.backend.service;

import net.javaguides.ems.backend.dto.EmployeeDto;
import net.javaguides.ems.backend.entity.Employee;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);
   void deleteEmployeById(Long employeeId);

}

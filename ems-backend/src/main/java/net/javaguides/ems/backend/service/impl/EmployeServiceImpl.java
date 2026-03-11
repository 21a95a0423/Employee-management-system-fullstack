package net.javaguides.ems.backend.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.backend.dto.EmployeeDto;
import net.javaguides.ems.backend.entity.Employee;
import net.javaguides.ems.backend.exceptions.ResourceNotFoundException;
import net.javaguides.ems.backend.mapper.EmployeeMapper;
import net.javaguides.ems.backend.repository.EmployeeRepository;
import net.javaguides.ems.backend.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class EmployeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;

    public EmployeeDto createEmployee(EmployeeDto employeeDto){
        Employee employee = EmployeeMapper.maptoEmployee(employeeDto);
        Employee savedEmployee= employeeRepository.save(employee);
        return EmployeeMapper.maptoEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {//before creating the method first go exception and create custum exception
       Employee employee= employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee not exist  with given Id : "+employeeId));
        return EmployeeMapper.maptoEmployeeDto(employee);
    }
//Get all employees
    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.maptoEmployeeDto(employee))
                .collect(Collectors.toList());

    }
    //Update
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee){
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                ()-> new ResourceNotFoundException("Employee is not exist with given id: "+employeeId)
        );
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        Employee updatedEmployeeObj = employeeRepository.save(employee);
        return EmployeeMapper.maptoEmployeeDto(updatedEmployeeObj);
    }
    //Delete employee By Id
    public void deleteEmployeById(Long employeId){
        Employee employee = employeeRepository.findById(employeId).orElseThrow(
                ()-> new ResourceNotFoundException("Employee is not exist with given id: "+employeId)
        );

        employeeRepository.deleteById(employeId);
    }

}

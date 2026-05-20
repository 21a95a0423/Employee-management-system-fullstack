package net.javaguides.ems.backend.mapper;

import net.javaguides.ems.backend.dto.EmployeeDto;
import net.javaguides.ems.backend.entity.Employee;

public class EmployeeMapper {

    // Entity → DTO
    public static EmployeeDto maptoEmployeeDto(Employee employee) {

        if (employee == null) {
            return null;
        }

        EmployeeDto dto = new EmployeeDto();

        dto.setId(employee.getId());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setEmail(employee.getEmail());

        // ❌ Do NOT send password in response
        return dto;
    }

    // DTO → Entity
    public static Employee maptoEmployee(EmployeeDto employeeDto) {

        if (employeeDto == null) {
            return null;
        }

        Employee employee = new Employee();

        employee.setId(employeeDto.getId());
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());

        // ✅ Only if you are saving password
        //employee.setPassword(employeeDto.getPassword);

        return employee;
    }
}
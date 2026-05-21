// EmployeeRepository.java
package net.javaguides.ems.backend.repository;

import net.javaguides.ems.backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // If your entity field name is: private String email;
   Optional<Employee> findByEmail(String email);

    // If your entity field name is: private String emailId;//Optional<Employee> findByEmailId(String EmailId);
}
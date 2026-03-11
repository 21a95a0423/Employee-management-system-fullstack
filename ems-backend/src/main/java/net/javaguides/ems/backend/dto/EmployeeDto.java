package net.javaguides.ems.backend.dto;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
    @Id
    private Long id;
    private String FirstName;
    private String LastName;
    private  String Email;
}

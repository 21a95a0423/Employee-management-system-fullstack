package net.javaguides.ems.backend.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "First_Name")
    private String FirstName;
    @Column(name = "Last_Name")
    private String LastName;
    @Column(name = "email" , unique = true, nullable = false)
    private String email;
    @Column(name = "Password")
    private  String password;
    public Employee() {
    }

    public Employee(Long id, String firstName, String lastName, String email, String password) {
        this.id = id;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.email = email;
        this.password = password;
    }



    public String getFirstName() {
        return FirstName;

    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }







}

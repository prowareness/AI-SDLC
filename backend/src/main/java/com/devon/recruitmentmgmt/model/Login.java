package com.devon.recruitmentmgmt.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Login")
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "email_id", nullable = false, unique = true)
    private String emailId;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "last_login", nullable = false)
    private String lastLogin;

    @Column(name = "is_active", nullable = false)
    private Integer isActive;

    @Column(name = "creation_date", nullable = false)
    private String creationDate;

    @Column(name = "last_updated", nullable = false)
    private String lastUpdated;
}
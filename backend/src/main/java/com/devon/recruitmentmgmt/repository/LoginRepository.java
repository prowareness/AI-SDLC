package com.devon.recruitmentmgmt.repository;

import com.devon.recruitmentmgmt.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginRepository extends JpaRepository<Login, Integer> {
    Optional<Login> findByEmailId(String emailId);
}

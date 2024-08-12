package com.devon.recruitmentmgmt.repository;

import com.devon.recruitmentmgmt.model.Vacancy;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VacancyRepository extends JpaRepository<Vacancy, String> {

    Vacancy findTopByOrderByVacancyIdDesc();

    @Query(value = "SELECT v FROM Vacancy v WHERE v.createdBy = :createdBy ORDER BY v.createdBy, v.vacancyId DESC")
    List<Vacancy> findVacanciesByCreatedBy(@Param("createdBy") String createdBy, Pageable pageable);
}
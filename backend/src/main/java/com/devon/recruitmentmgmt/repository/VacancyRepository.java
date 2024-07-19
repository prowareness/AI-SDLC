package com.devon.recruitmentmgmt.repository;

import com.devon.recruitmentmgmt.model.Vacancy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacancyRepository extends JpaRepository<Vacancy, String> {
    Vacancy findTopByOrderByVacancyIdDesc();
}

package com.devon.recruitmentmgmt.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.devon.recruitmentmgmt.util.LocalDateTimeConverter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Vacancy")
public class Vacancy {
    @Id
    @Column(name = "vacancy_id", nullable = false)
    private String vacancyId;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "requirements", nullable = false)
    private String requirements;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "max_salary")
    private BigDecimal maxSalary;

    @Column(name = "application_deadline", nullable = false)
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime applicationDeadline;

    @Column(name = "created_by", nullable = false)
    private String createdBy;

    @Column(name = "creation_date", nullable = false)
    @Convert(converter = LocalDateTimeConverter.class)
    private LocalDateTime creationDate;
}

package com.devon.recruitmentmgmt.validation;

import com.devon.recruitmentmgmt.to.CreateVacancyRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertThrows;

public class VacancyRequestValidatorTest {

    @InjectMocks
    private VacancyRequestValidator validator;
    @Mock
    private CreateVacancyRequest request;

    @BeforeEach
    void setUp() {
        validator = new VacancyRequestValidator();
        request = new CreateVacancyRequest();
        // Assuming setters for all fields exist in CreateVacancyRequest
        request.setJobTitle("Software Engineer");
        request.setDescription("Job description here");
        request.setRequirements("Job requirements here");
        request.setLocation("New York");
        request.setMaxSalary(new BigDecimal("70000"));
        request.setApplicationDeadline(new Date());
        request.setCreatedBy("HR Department");
    }

    @Test
    void validRequestDoesNotThrowException() {
        validator.validateCreateVacancyRequest(request);
    }

    @Test
    void nullRequestThrowsBadRequest() {
        assertThrows(ResponseStatusException.class, () -> validator.validateCreateVacancyRequest(null), "CreateVacancyRequest cannot be null");
    }

    @Test
    void emptyJobTitleThrowsBadRequest() {
        request.setJobTitle("");
        assertThrows(ResponseStatusException.class, () -> validator.validateCreateVacancyRequest(request), "Job title cannot be null or empty");
    }

    @Test
    void nullDescriptionThrowsBadRequest() {
        request.setDescription(null);
        assertThrows(ResponseStatusException.class, () -> validator.validateCreateVacancyRequest(request), "Description cannot be null or empty");
    }

    @Test
    void emptyRequirementsThrowsBadRequest() {
        request.setRequirements("");
        assertThrows(ResponseStatusException.class, () -> validator.validateCreateVacancyRequest(request), "Requirements cannot be null or empty");
    }

    @Test
    void nullLocationThrowsBadRequest() {
        request.setLocation(null);
        assertThrows(ResponseStatusException.class, () -> validator.validateCreateVacancyRequest(request), "Location cannot be null or empty");
    }

    @Test
    void nullMaxSalaryThrowsBadRequest() {
        request.setMaxSalary(null);
        assertThrows(ResponseStatusException.class, () -> validator.validateCreateVacancyRequest(request), "Max salary cannot be null");
    }

   /* @Test
    void negativeMaxSalaryThrowsBadRequest() {
        request.setMaxSalary(new BigDecimal("-1"));
        assertThrows(ResponseStatusException.class, () -> validator.validateCreateVacancyRequest(request), "Max salary must be a positive number");
    }*/

    @Test
    void nullApplicationDeadlineThrowsBadRequest() {
        request.setApplicationDeadline(null);
        assertThrows(ResponseStatusException.class, () -> validator.validateCreateVacancyRequest(request), "Application deadline cannot be null");
    }

    @Test
    void nullCreatedByThrowsBadRequest() {
        request.setCreatedBy(null);
        assertThrows(ResponseStatusException.class, () -> validator.validateCreateVacancyRequest(request), "Created by cannot be null or empty");
    }

    @Test
    void emptyCreatedByThrowsBadRequest() {
        request.setCreatedBy("");
        assertThrows(ResponseStatusException.class, () -> validator.validateCreateVacancyRequest(request), "Created by cannot be null or empty");
    }
}

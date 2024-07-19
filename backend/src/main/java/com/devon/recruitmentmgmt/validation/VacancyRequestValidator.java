package com.devon.recruitmentmgmt.validation;

import com.devon.recruitmentmgmt.to.CreateVacancyRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.Date;

@Component
public class VacancyRequestValidator {

    public void validateCreateVacancyRequest(CreateVacancyRequest request) {
        if (request == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CreateVacancyRequest cannot be null");
        }

        if (request.getJobTitle() == null || request.getJobTitle().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Job title cannot be null or empty");
        }

        validateString(request.getJobTitle(), "Job title");

        if (request.getDescription() == null || request.getDescription().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Description cannot be null or empty");
        }

        validateString(request.getDescription(), "Description");

        if (request.getRequirements() == null || request.getRequirements().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Requirements cannot be null or empty");
        }

        validateString(request.getRequirements(), "Requirements");

        if (request.getLocation() == null || request.getLocation().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Location cannot be null or empty");
        }

        validateString(request.getLocation(), "Location");

        if (request.getMaxSalary() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Max salary cannot be null");
        }

        validateBigDecimal(request.getMaxSalary(), "Max salary");

        if (request.getApplicationDeadline() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Application deadline cannot be null");
        }

        validateDate(request.getApplicationDeadline(), "Application deadline");

        if (request.getCreatedBy() == null || request.getCreatedBy().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Created by cannot be null or empty");
        }

        validateString(request.getCreatedBy(), "Created by");
    }

    private static void validateString(String value, String fieldName) {
        if (value == null || value.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, fieldName + " cannot be null or empty");
        }
    }

    private static void validateBigDecimal(BigDecimal value, String fieldName) {
        try {
            new BigDecimal(value.toString());
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, fieldName + " must be a valid number");
        }
    }

    private static void validateDate(Date value, String fieldName) {
        if (!(value instanceof Date)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, fieldName + " must be a valid date");
        }
    }
}

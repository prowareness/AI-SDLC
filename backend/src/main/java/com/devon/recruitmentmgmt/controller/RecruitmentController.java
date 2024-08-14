package com.devon.recruitmentmgmt.controller;

import com.devon.recruitmentmgmt.service.LoginService;
import com.devon.recruitmentmgmt.service.VacancyService;
import com.devon.recruitmentmgmt.to.CreateVacancyRequest;
import com.devon.recruitmentmgmt.to.CreateVacancyResponse;
import com.devon.recruitmentmgmt.to.VacancyResponse;
import com.devon.recruitmentmgmt.to.LoginResponse;
import com.devon.recruitmentmgmt.to.LoginRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class RecruitmentController implements com.devon.recruitmentmgmt.api.ApiApi {

    private final VacancyService vacancyService;
    private final LoginService loginService;

    @Override
    public ResponseEntity<List<VacancyResponse>> apiVacanciesGet(String createdBy, Integer limit, Integer offset, String sortBy, String sortDirection) {
        log.info("Hit /api/vacancies with params createdBy: {}, limit: {}, offset: {}, sortBy: {}, sortDirection: {}", createdBy, limit, offset, sortBy, sortDirection);
        return new ResponseEntity<>(vacancyService.getVacanciesCreatedByRecruiter(createdBy, limit, offset, sortBy, sortDirection), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CreateVacancyResponse> apiVacanciesPost(CreateVacancyRequest createVacancyRequest) {
        log.info("Hit /api/vacancies with RequestBody {}", createVacancyRequest.toString());
        return new ResponseEntity<>(vacancyService.createVacancy(createVacancyRequest), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<VacancyResponse> apiVacanciesVacancyIdGet(String vacancyId) {
        log.info("Hit /api/vacancies with vacancyID {}", vacancyId);
        return new ResponseEntity<>(vacancyService.getVacancyById(vacancyId), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<LoginResponse> apiLoginPost(LoginRequest loginRequest) {
        log.info("Hit /api/login with RequestBody {}", loginRequest.toString());
        com.devon.recruitmentmgmt.to.LoginResponse response = loginService.validateLogin(loginRequest);
        if (response.getSuccess()) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }
}

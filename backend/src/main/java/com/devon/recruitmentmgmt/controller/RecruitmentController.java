package com.devon.recruitmentmgmt.controller;

import com.devon.recruitmentmgmt.service.VacancyService;
import com.devon.recruitmentmgmt.to.CreateVacancyRequest;
import com.devon.recruitmentmgmt.to.CreateVacancyResponse;
import com.devon.recruitmentmgmt.to.VacancyResponse;
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

    @Override
    public ResponseEntity<List<VacancyResponse>> apiVacanciesGet() {
        return null;
    }

    @Override
    public ResponseEntity<CreateVacancyResponse> apiVacanciesPost(CreateVacancyRequest createVacancyRequest) {
        return new ResponseEntity<>(vacancyService.createVacancy(createVacancyRequest), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<VacancyResponse> apiVacanciesVacancyIdGet(String vacancyId) {
        return null;
    }
}

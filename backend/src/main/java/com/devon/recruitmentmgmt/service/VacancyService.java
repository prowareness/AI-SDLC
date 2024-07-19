package com.devon.recruitmentmgmt.service;

import com.devon.recruitmentmgmt.model.Vacancy;
import com.devon.recruitmentmgmt.config.Configuration;
import com.devon.recruitmentmgmt.repository.VacancyRepository;
import com.devon.recruitmentmgmt.util.DateTimeUtil;
import com.devon.recruitmentmgmt.validation.VacancyRequestValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class VacancyService {

    private final VacancyRepository vacancyRepository;

    private final VacancyRequestValidator vacancyRequestValidator;

    private final Configuration configuration;

    @Transactional
    public com.devon.recruitmentmgmt.to.CreateVacancyResponse createVacancy(com.devon.recruitmentmgmt.to.CreateVacancyRequest createVacancyRequest) {
        vacancyRequestValidator.validateCreateVacancyRequest(createVacancyRequest);
        LocalDateTime applicationDeadline = DateTimeUtil.convertToLocalDateTime(createVacancyRequest.getApplicationDeadline());
        String newVacancyId = generateNewVacancyId();
        Vacancy vacancy = Vacancy.builder()
                .vacancyId(newVacancyId)
                .jobTitle(createVacancyRequest.getJobTitle())
                .description(createVacancyRequest.getDescription())
                .requirements(createVacancyRequest.getRequirements())
                .location(createVacancyRequest.getLocation())
                .maxSalary(createVacancyRequest.getMaxSalary())
                .applicationDeadline(applicationDeadline)
                .createdBy(createVacancyRequest.getCreatedBy())
                .creationDate(LocalDateTime.now())
                .build();

        vacancyRepository.save(vacancy);

        log.info("Vacancy created with ID: {}", newVacancyId);
        return com.devon.recruitmentmgmt.to.CreateVacancyResponse.builder()
                .vacancyId(newVacancyId)
                .build();
    }

    String generateNewVacancyId() {
        Vacancy lastVacancy = vacancyRepository.findTopByOrderByVacancyIdDesc();
        if (lastVacancy == null) {
            return configuration.getDefaultJobId();
        } else {
            String lastId = lastVacancy.getVacancyId();
            int idNumber = Integer.parseInt(lastId.replaceAll("\\D", ""));
            return String.format(configuration.getFormatJobId(), idNumber + 1);
        }
    }
}

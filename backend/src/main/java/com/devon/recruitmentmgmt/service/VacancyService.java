package com.devon.recruitmentmgmt.service;

import com.devon.recruitmentmgmt.model.Vacancy;
import com.devon.recruitmentmgmt.config.Configuration;
import com.devon.recruitmentmgmt.repository.VacancyRepository;
import com.devon.recruitmentmgmt.util.DateTimeUtil;
import com.devon.recruitmentmgmt.validation.VacancyRequestValidator;
import com.devon.recruitmentmgmt.to.CreateVacancyResponse;
import com.devon.recruitmentmgmt.to.CreateVacancyRequest;
import com.devon.recruitmentmgmt.to.VacancyResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class VacancyService {

    private final VacancyRepository vacancyRepository;

    private final VacancyRequestValidator vacancyRequestValidator;

    private final Configuration configuration;

    @Transactional
    public CreateVacancyResponse createVacancy(CreateVacancyRequest createVacancyRequest) {
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
        return CreateVacancyResponse.builder()
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

    public List<VacancyResponse> getVacanciesCreatedByRecruiter(String createdBy, Integer limit, Integer offset, String sortBy, String sortDirection) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(offset, limit, sort);
        List<Vacancy> vacancies = vacancyRepository.findVacanciesByCreatedBy(createdBy, pageable);
        return generateVacancyResponseList(vacancies);
    }

    private List<VacancyResponse> generateVacancyResponseList(List<Vacancy> vacancies) {
        return vacancies.stream().map(this::convertVacancyToVacancyResponse).collect(Collectors.toList());
    }

    public VacancyResponse getVacancyById(String vacancyId) {
        Vacancy vacancy = vacancyRepository.findById(vacancyId)
                .orElseThrow(() -> new RuntimeException("Vacancy not found with ID: " + vacancyId));
        return convertVacancyToVacancyResponse(vacancy);
    }

    private VacancyResponse convertVacancyToVacancyResponse(Vacancy vacancy) {
        return VacancyResponse.builder()
                .vacancyId(vacancy.getVacancyId())
                .jobTitle(vacancy.getJobTitle())
                .description(vacancy.getDescription())
                .requirements(vacancy.getRequirements())
                .location(vacancy.getLocation())
                .maxSalary(vacancy.getMaxSalary())
                .applicationDeadline(DateTimeUtil.convertLocalDateToDate(vacancy.getApplicationDeadline()))
                .createdBy(vacancy.getCreatedBy())
                .build();
    }

}

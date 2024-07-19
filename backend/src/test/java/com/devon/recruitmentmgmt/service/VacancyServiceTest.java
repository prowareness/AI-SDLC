package com.devon.recruitmentmgmt.service;

import com.devon.recruitmentmgmt.config.Configuration;
import com.devon.recruitmentmgmt.model.Vacancy;
import com.devon.recruitmentmgmt.repository.VacancyRepository;
import com.devon.recruitmentmgmt.to.CreateVacancyRequest;
import com.devon.recruitmentmgmt.to.CreateVacancyResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class VacancyServiceTest {

    @Mock
    private VacancyRepository vacancyRepository;

    @Mock
    private Configuration configuration;

    @InjectMocks
    private VacancyService vacancyService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        when(configuration.getDefaultJobId()).thenReturn("JOB000001");
        when(configuration.getFormatJobId()).thenReturn("JOB%06d");
    }

    @Test
    public void createVacancy_shouldReturnNewVacancyId_whenVacancyIsCreatedSuccessfully() {
        // Given
        CreateVacancyRequest request = new CreateVacancyRequest();
        request.setJobTitle("Software Engineer");
        request.setDescription("Develop software");
        request.setRequirements("Java, Spring Boot");
        request.setLocation("New York");
        request.setMaxSalary(BigDecimal.valueOf(120000));
        request.setApplicationDeadline(Date.from(LocalDateTime.now().atZone(java.time.ZoneId.systemDefault()).toInstant()));
        request.setCreatedBy("john.doe@devon.nl");

        Vacancy savedVacancy = new Vacancy();
        savedVacancy.setVacancyId("JOB000002");

        when(vacancyRepository.save(any(Vacancy.class))).thenReturn(savedVacancy);
        when(vacancyRepository.findTopByOrderByVacancyIdDesc()).thenReturn(Vacancy.builder().vacancyId("JOB000001").build());

        // When
        CreateVacancyResponse response = vacancyService.createVacancy(request);

        // Then
        assertEquals("JOB000002", response.getVacancyId());
    }

    @Test
    public void generateNewVacancyId_shouldReturnDefaultId_whenNoPreviousVacanciesExist() {
        // Given
        when(vacancyRepository.findTopByOrderByVacancyIdDesc()).thenReturn(null);

        // When
        String newVacancyId = vacancyService.generateNewVacancyId();

        // Then
        assertEquals("JOB000001", newVacancyId);
    }

    @Test
    public void generateNewVacancyId_shouldIncrementVacancyIdCorrectly_whenPreviousVacanciesExist() {
        // Given
        when(vacancyRepository.findTopByOrderByVacancyIdDesc()).thenReturn(Vacancy.builder().vacancyId("JOB000010").build());

        // When
        String newVacancyId = vacancyService.generateNewVacancyId();

        // Then
        assertEquals("JOB000011", newVacancyId);
    }
}
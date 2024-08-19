package com.devon.recruitmentmgmt.service;

import com.devon.recruitmentmgmt.config.Configuration;
import com.devon.recruitmentmgmt.model.Vacancy;
import com.devon.recruitmentmgmt.repository.VacancyRepository;
import com.devon.recruitmentmgmt.to.CreateVacancyRequest;
import com.devon.recruitmentmgmt.to.CreateVacancyResponse;
import com.devon.recruitmentmgmt.to.VacancyResponse;
import com.devon.recruitmentmgmt.to.VacancyListResponse;
import com.devon.recruitmentmgmt.validation.VacancyRequestValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class VacancyServiceTest {

    @Mock
    private VacancyRepository vacancyRepository;

    @Mock
    private Configuration configuration;

    @Mock
    private VacancyRequestValidator vacancyRequestValidator;

    @InjectMocks
    private VacancyService vacancyService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        when(configuration.getDefaultJobId()).thenReturn("JOB000001");
        when(configuration.getFormatJobId()).thenReturn("JOB%06d");
        doNothing().when(vacancyRequestValidator).validateCreateVacancyRequest(any(CreateVacancyRequest.class));
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
    public void createVacancy_shouldThrowException_whenValidationFails() {
        // Given
        CreateVacancyRequest request = new CreateVacancyRequest();
        doThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Validation failed"))
                .when(vacancyRequestValidator).validateCreateVacancyRequest(any(CreateVacancyRequest.class));

        // When & Then
        assertThrows(ResponseStatusException.class, () -> vacancyService.createVacancy(request));
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

    @Test
    public void getVacanciesCreatedByRecruiter_shouldReturnVacancies() {
        // Given
        String createdBy = "john.doe@devon.nl";
        int limit = 10;
        int offset = 0;
        String sortBy = "creationDate";
        String sortDirection = "DESC";
        Pageable pageable = PageRequest.of(offset, limit, Sort.by(Sort.Direction.fromString(sortDirection), sortBy));
        List<Vacancy> vacancies = List.of(new Vacancy(), new Vacancy());

        when(vacancyRepository.findVacanciesByCreatedBy(createdBy, pageable)).thenReturn(vacancies);

        // When
        VacancyListResponse responses = vacancyService.getVacanciesCreatedByRecruiter(createdBy, limit, offset, sortBy, sortDirection);

        // Then
        assertEquals(2, responses.getVacancies().size());
    }

    @Test
    public void getVacancyById_shouldReturnVacancyResponse_whenValidVacancyId() {
        // Given
        String vacancyId = "JOB000001";
        Vacancy vacancy = Vacancy.builder()
                .vacancyId(vacancyId)
                .jobTitle("Software Engineer")
                .description("Develop software")
                .requirements("Java, Spring Boot")
                .location("New York")
                .maxSalary(BigDecimal.valueOf(120000))
                .applicationDeadline(LocalDateTime.now().plusDays(30))
                .createdBy("john.doe@devon.nl")
                .creationDate(LocalDateTime.now())
                .build();

        when(vacancyRepository.findById(vacancyId)).thenReturn(Optional.of(vacancy));

        // When
        VacancyResponse response = vacancyService.getVacancyById(vacancyId);

        // Then
        assertEquals(vacancyId, response.getVacancyId());
        assertEquals("Software Engineer", response.getJobTitle());
        assertEquals("Develop software", response.getDescription());
        assertEquals("Java, Spring Boot", response.getRequirements());
        assertEquals("New York", response.getLocation());
        assertEquals(BigDecimal.valueOf(120000), response.getMaxSalary());
        assertEquals("john.doe@devon.nl", response.getCreatedBy());
    }

    @Test
    public void getVacancyById_shouldThrowException_whenInvalidVacancyId() {
        // Given
        String vacancyId = "INVALID_ID";
        when(vacancyRepository.findById(vacancyId)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(RuntimeException.class, () -> vacancyService.getVacancyById(vacancyId));
    }

    @Test
    public void getTotalVacanciesCountByCreatedBy_shouldReturnCorrectCount() {
        // Given
        String createdBy = "john.doe@devon.nl";
        long expectedCount = 5;
        when(vacancyRepository.countVacanciesByCreatedBy(createdBy)).thenReturn(expectedCount);

        // When
        long actualCount = vacancyService.getTotalVacanciesCountByCreatedBy(createdBy);

        // Then
        assertEquals(expectedCount, actualCount);
    }
}
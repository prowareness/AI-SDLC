package com.devon.recruitmentmgmt.controller;

import com.devon.recruitmentmgmt.service.LoginService;
import com.devon.recruitmentmgmt.service.VacancyService;
import com.devon.recruitmentmgmt.to.CreateVacancyRequest;
import com.devon.recruitmentmgmt.to.CreateVacancyResponse;
import com.devon.recruitmentmgmt.to.VacancyListResponse;
import com.devon.recruitmentmgmt.to.VacancyResponse;
import com.devon.recruitmentmgmt.to.LoginRequest;
import com.devon.recruitmentmgmt.to.LoginResponse;
import org.apache.catalina.filters.CorsFilter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class RecruitmentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private VacancyService vacancyService;

    @MockBean
    private LoginService loginService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context)
                .addFilters(new CorsFilter())
                .build();
    }

    @Test
    public void apiVacanciesGet_shouldReturnVacanciesWithCount_whenValidRequest() throws Exception {
        String createdBy = "john.doe@devon.nl";
        int limit = 10;
        int offset = 0;
        String sortBy = "creationDate";
        String sortDirection = "DESC";
        List<VacancyResponse> responses = Arrays.asList(
                VacancyResponse.builder().vacancyId("JOB000001").jobTitle("Software Engineer").build(),
                VacancyResponse.builder().vacancyId("JOB000002").jobTitle("Data Scientist").build()
        );
        long totalCount = 2;

        VacancyListResponse vacancyListResponse = VacancyListResponse.builder().vacancies(responses).total(totalCount).build();

        when(vacancyService.getVacanciesCreatedByRecruiter(createdBy, limit, offset, sortBy, sortDirection)).thenReturn(vacancyListResponse);

        mockMvc.perform(get("/api/vacancies")
                        .param("createdBy", createdBy)
                        .param("limit", String.valueOf(limit))
                        .param("offset", String.valueOf(offset))
                        .param("sortBy", sortBy)
                        .param("sortDirection", sortDirection))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(vacancyListResponse)));
    }

    @Test
    public void apiVacanciesGet_shouldReturnEmptyListWithCountZero_whenNoVacanciesFound() throws Exception {
        String createdBy = "john.doe@devon.nl";
        int limit = 10;
        int offset = 0;
        String sortBy = "creationDate";
        String sortDirection = "DESC";
        List<VacancyResponse> responses = List.of();
        long totalCount = 0;

        VacancyListResponse vacancyListResponse = VacancyListResponse.builder().vacancies(responses).total(totalCount).build();

        when(vacancyService.getVacanciesCreatedByRecruiter(createdBy, limit, offset, sortBy, sortDirection)).thenReturn(vacancyListResponse);

        mockMvc.perform(get("/api/vacancies")
                        .param("createdBy", createdBy)
                        .param("limit", String.valueOf(limit))
                        .param("offset", String.valueOf(offset))
                        .param("sortBy", sortBy)
                        .param("sortDirection", sortDirection))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(vacancyListResponse)));
    }


    @Test
    public void apiVacanciesVacancyIdGet_shouldReturnVacancy_whenValidVacancyId() throws Exception {
        String vacancyId = "JOB000001";
        VacancyResponse response = VacancyResponse.builder()
                .vacancyId(vacancyId)
                .jobTitle("Software Engineer")
                .description("Develop software")
                .requirements("Java, Spring Boot")
                .location("New York")
                .maxSalary(BigDecimal.valueOf(120000))
                .build();

        when(vacancyService.getVacancyById(vacancyId)).thenReturn(response);

        mockMvc.perform(get("/api/vacancies/{vacancyId}", vacancyId))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(response)));
    }

    @Test
    public void testApiVacanciesPost() throws Exception {
        CreateVacancyRequest request = new CreateVacancyRequest(); // Populate with test data
        CreateVacancyResponse response = CreateVacancyResponse.builder().vacancyId("JOB000001").build(); // Populate with expected response data
        when(vacancyService.createVacancy(request)).thenReturn(response);

        mockMvc.perform(post("/api/vacancies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(content().json(objectMapper.writeValueAsString(response)));
    }

    @Test
    public void testApiLoginPost_Success() throws Exception {
        LoginRequest request = new LoginRequest("john.doe@devon.nl", "devon123");
        LoginResponse response = LoginResponse.builder().success(true).message("Login successful").build();
        when(loginService.validateLogin(request)).thenReturn(response);

        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(response)));
    }

    @Test
    public void testApiLoginPost_Failure() throws Exception {
        LoginRequest request = new LoginRequest("john.doe@devon.nl", "wrongpassword");
        LoginResponse response = LoginResponse.builder().success(false).message("Invalid email or password").build();
        when(loginService.validateLogin(request)).thenReturn(response);

        mockMvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().json(objectMapper.writeValueAsString(response)));
    }

    @Test
    public void editVacancy_shouldReturnUpdatedVacancy_whenValidRequest() throws Exception {
        String vacancyId = "JOB000001";
        CreateVacancyRequest request = new CreateVacancyRequest();
        request.setJobTitle("Updated Title");
        request.setDescription("Updated Description");
        request.setRequirements("Updated Requirements");
        request.setLocation("Updated Location");
        request.setMaxSalary(BigDecimal.valueOf(150000));
        request.setApplicationDeadline(new Date());

        VacancyResponse response = VacancyResponse.builder()
                .vacancyId(vacancyId)
                .jobTitle("Updated Title")
                .description("Updated Description")
                .requirements("Updated Requirements")
                .location("Updated Location")
                .maxSalary(BigDecimal.valueOf(150000))
                .applicationDeadline(new Date())
                .createdBy("john.doe@devon.nl")
                .build();

        when(vacancyService.editVacancy(any(String.class), any(CreateVacancyRequest.class))).thenReturn(response);

        mockMvc.perform(put("/api/vacancies/{vacancyId}", vacancyId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(response)));
    }

}
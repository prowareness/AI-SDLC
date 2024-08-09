package com.devon.recruitmentmgmt.controller;

import com.devon.recruitmentmgmt.service.LoginService;
import com.devon.recruitmentmgmt.service.VacancyService;
import com.devon.recruitmentmgmt.to.CreateVacancyRequest;
import com.devon.recruitmentmgmt.to.CreateVacancyResponse;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

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

    /*@Test
    public void testApiVacanciesGet() throws Exception {
        List<VacancyResponse> mockResponses = Arrays.asList(new VacancyResponse(), new VacancyResponse()); // Populate with test data
        when(vacancyService.findAllVacancies()).thenReturn(mockResponses);

        mockMvc.perform(get("/api/vacancies"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(mockResponses)));
    }*/

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

   /* @Test
    public void testApiVacanciesVacancyIdGet() throws Exception {
        String vacancyId = "testVacancyId";
        VacancyResponse response = new VacancyResponse(); // Populate with expected data
        when(vacancyService.findVacancyById(vacancyId)).thenReturn(response);

        mockMvc.perform(get("/api/vacancies/{vacancyId}", vacancyId))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(response)));
    }*/


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
}
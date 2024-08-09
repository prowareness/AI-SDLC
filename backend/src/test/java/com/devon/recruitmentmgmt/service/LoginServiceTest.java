package com.devon.recruitmentmgmt.service;

import com.devon.recruitmentmgmt.config.Configuration;
import com.devon.recruitmentmgmt.model.Login;
import com.devon.recruitmentmgmt.repository.LoginRepository;
import com.devon.recruitmentmgmt.to.LoginRequest;
import com.devon.recruitmentmgmt.to.LoginResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LoginServiceTest {

    @Mock
    LoginRepository loginRepository;

    @Mock
    Configuration configuration;

    @InjectMocks
    LoginService loginService;

    @Test
    public void validateLogin_shouldReturnSuccess_whenCredentialsAreValid() {
        LoginRequest request = new LoginRequest("john.doe@devon.nl", "devon123");
        Login login = new Login();
        login.setEmailId("john.doe@devon.nl");
        login.setPassword("devon123");
        when(loginRepository.findByEmailId("john.doe@devon.nl")).thenReturn(Optional.of(login));
        when(configuration.getDateTimeFormat()).thenReturn("yyyy-MM-dd HH:mm:ss");
        LoginResponse response = loginService.validateLogin(request);

        assertTrue(response.getSuccess());
        assertEquals("Login successful", response.getMessage());

        ArgumentCaptor<Login> loginCaptor = ArgumentCaptor.forClass(Login.class);
        verify(loginRepository).save(loginCaptor.capture());
        assertNotNull(loginCaptor.getValue().getLastLogin());
    }

    @Test
    public void validateLogin_shouldReturnFailure_whenEmailDoesNotExist() {
        LoginRequest request = new LoginRequest("nonexistent@devon.nl", "devon123");
        when(loginRepository.findByEmailId("nonexistent@devon.nl")).thenReturn(Optional.empty());
        when(configuration.getDateTimeFormat()).thenReturn("yyyy-MM-dd HH:mm:ss");
        LoginResponse response = loginService.validateLogin(request);

        assertFalse(response.getSuccess());
        assertEquals("Invalid email or password", response.getMessage());

        verify(loginRepository, never()).save(any(Login.class));
    }

    @Test
    public void validateLogin_shouldReturnFailure_whenPasswordIsIncorrect() {
        LoginRequest request = new LoginRequest("john.doe@devon.nl", "wrongpassword");
        Login login = new Login();
        login.setEmailId("john.doe@devon.nl");
        login.setPassword("devon123");
        when(loginRepository.findByEmailId("john.doe@devon.nl")).thenReturn(Optional.of(login));
        when(configuration.getDateTimeFormat()).thenReturn("yyyy-MM-dd HH:mm:ss");
        LoginResponse response = loginService.validateLogin(request);

        assertFalse(response.getSuccess());
        assertEquals("Invalid email or password", response.getMessage());

        verify(loginRepository, never()).save(any(Login.class));
    }
}
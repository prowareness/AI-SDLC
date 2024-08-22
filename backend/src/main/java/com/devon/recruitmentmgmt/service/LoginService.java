package com.devon.recruitmentmgmt.service;

import com.devon.recruitmentmgmt.config.Configuration;
import com.devon.recruitmentmgmt.model.Login;
import com.devon.recruitmentmgmt.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.devon.recruitmentmgmt.to.LoginResponse;
import com.devon.recruitmentmgmt.to.LoginRequest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

    private final LoginRepository loginRepository;
    private final Configuration configuration;

    public LoginResponse validateLogin(LoginRequest loginRequest) {
        Optional<Login> loginOptional = loginRepository.findByEmailId(loginRequest.getEmailId());
        if (loginOptional.isPresent() && loginOptional.get().getPassword().equals(loginRequest.getPassword())) {
            Login login = loginOptional.get();
            login.setLastLogin(LocalDateTime.now().format(DateTimeFormatter.ofPattern(configuration.getDateTimeFormat())));
            loginRepository.save(login);
            log.info("Login successful for user - {}", loginRequest.getEmailId());
            return buildLoginResponse(true, "Login successful");
        } else {
            log.error("Invalid email or password provided for user - {}", loginRequest.getEmailId());
            return buildLoginResponse(false, "Invalid email or password");
        }
    }

    private LoginResponse buildLoginResponse(boolean success, String message) {
        return LoginResponse.builder().success(success).message(message).build();
    }
}
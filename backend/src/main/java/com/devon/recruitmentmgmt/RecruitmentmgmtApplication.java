package com.devon.recruitmentmgmt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class RecruitmentmgmtApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(RecruitmentmgmtApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(RecruitmentmgmtApplication.class, args);
	}

}

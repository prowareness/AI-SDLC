package com.devon.recruitmentmgmt.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "configuration")
public class Configuration {
    String defaultJobId;
    String formatJobId;
}

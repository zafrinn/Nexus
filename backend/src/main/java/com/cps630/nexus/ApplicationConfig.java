package com.cps630.nexus;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {
	@Value("${db.url}")
	private String dbUrl;
	
	@Value("${db.username}")
	private String dbUsername;
	
	@Value("${db.password}")
	private String dbPassword;
	
	@Bean
	public DataSource dataSource() {
		return DataSourceBuilder
				.create()
				.driverClassName("com.mysql.cj.jdbc.Driver")
				.url(dbUrl)
				.username(dbUsername)
				.password(dbPassword)
				.build();
	}
}
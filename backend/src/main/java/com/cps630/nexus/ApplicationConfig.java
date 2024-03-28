package com.cps630.nexus;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {
	@Bean
	public DataSource dataSource() {
		return DataSourceBuilder
				.create()
				.driverClassName("com.mysql.cj.jdbc.Driver")
				.url("jdbc:mysql://ls-1801805632eccdecf0e95c345d2de9ce7799744f.cdqeoq0qq4tv.ca-central-1.rds.amazonaws.com:3306/nexus")
				.username("dbmasteruser")
				.password("oX;)`0G^|*G{u#}C?,C1UG7VqvT3#+w_")
				.build();
	}
}
package com.cps630.nexus.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.XXssProtectionHeaderWriter;

import com.cps630.nexus.util.ConstantUtil;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Bean
	public static PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain filterSecurity(HttpSecurity http) throws Exception {
		http.cors(Customizer.withDefaults())
			.csrf(csrf -> csrf.disable())
			.headers(headers -> headers
				.xssProtection(xss -> xss.headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK)))
					//.contentSecurityPolicy(cps -> cps.policyDirectives("script-src 'self'")))
			.authorizeHttpRequests(auth -> auth
				.requestMatchers("api/v1/external/**").permitAll()
				.requestMatchers("api/v1/internal/admin/**").hasAnyAuthority(ConstantUtil.ADMIN)
				.requestMatchers("api/v1/internal/basic/**").hasAnyAuthority(ConstantUtil.BASIC, ConstantUtil.ADMIN).anyRequest().authenticated());
			
		return http.build();
	}
}